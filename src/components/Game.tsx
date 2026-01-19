'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getQuestionsByType, Question, QuestionType, shuffleArray, JudgeQuestion, getJudgeQuestionByLevel } from '@/lib/questions';
import { ArrowLeft, CheckCircle, XCircle, Clock, Trophy, RotateCcw, Crown, Shuffle, Plus, Trash2, Users } from 'lucide-react';

interface GameProps {
  gameMode: 'single' | 'multi' | 'ladder';
  questionType: QuestionType;
  onBack: () => void;
}

// 答题记录接口
interface AnswerRecord {
  question: Question;
  userAnswer: number | null;
  isCorrect: boolean;
}

// 音效播放函数
const playSoundEffect = (type: 'correct' | 'wrong') => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === 'correct') {
      // 正确音效：愉悦的上升音调
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
      oscillator.frequency.setValueAtTime(1046.50, audioContext.currentTime + 0.3); // C6
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.4);
    } else {
      // 错误音效：低沉的下降音调
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.3);
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    }
  } catch (error) {
    console.log('音效播放失败:', error);
  }
};

// 321并发语音提示函数
const play321 = (onVoiceComplete: () => void) => {
  console.log('🎤 播放321倒计时...');

  // 使用固定时间开始，不依赖语音，避免"一闪而过"
  setTimeout(() => {
    console.log('🎮 延迟开始游戏');
    onVoiceComplete();
  }, 3500); // 3.5秒后自动开始（足够播放321）

  // 尝试播放语音
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      // 取消之前的播放
      window.speechSynthesis.cancel();

      // 同时创建3、2、1三个语音
      const count3 = new SpeechSynthesisUtterance('3');
      const count2 = new SpeechSynthesisUtterance('2');
      const count1 = new SpeechSynthesisUtterance('1');
      const start = new SpeechSynthesisUtterance('开始');

      // 设置参数
      [count3, count2, count1].forEach(utt => {
        utt.rate = 0.8;
        utt.pitch = 1.0;
        utt.volume = 1.0;
        utt.lang = 'zh-CN';
      });

      // "开始"参数
      start.rate = 1.0;
      start.pitch = 1.0;
      start.volume = 1.0;
      start.lang = 'zh-CN';

      // 监听1播放完成后再播放"开始"
      count1.onend = () => {
        console.log('▶️ 321播放完成，开始播放"开始"');
        window.speechSynthesis.speak(start);
      };

      // 并发播放321
      window.speechSynthesis.speak(count3);
      window.speechSynthesis.speak(count2);
      window.speechSynthesis.speak(count1);

      console.log('▶️ 321语音已并发播放');
    } catch (error) {
      console.log('❌ 321语音播放失败:', error);
    }
  } else {
    console.log('❌ 浏览器不支持语音');
  }
};

// 播放倒计时数字
const playCountdownNumber = (number: number) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(number.toString());
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      utterance.lang = 'zh-CN';
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.log('❌ 倒计时语音播放失败:', error);
    }
  }
};

// 播放钟表滴答音效
const playTickSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.05);
  } catch (error) {
    console.log('❌ 滴答音效播放失败:', error);
  }
};

// 玩家状态接口
interface PlayerState {
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  isAnswered: boolean;
  score: number;
  showExplanation: boolean;
  answerRecords: AnswerRecord[];
}

export default function Game({ gameMode, questionType, onBack }: GameProps) {
  // 生成题目并打乱
  const generateQuestions = () => {
    const baseQuestions = getQuestionsByType(questionType, 10);
    const questions = shuffleArray([...baseQuestions]);
    
    // 为双人模式生成两个不同的打乱题目顺序
    const player1Questions = shuffleArray([...baseQuestions]);
    const player2Questions = shuffleArray([...baseQuestions]);
    
    // 确保两个玩家的题目顺序不同
    let attempts = 0;
    let finalPlayer2Questions = player2Questions;
    while (
      attempts < 100 &&
      finalPlayer2Questions.every((q, i) => q.id === player1Questions[i]?.id)
    ) {
      finalPlayer2Questions = shuffleArray([...baseQuestions]);
      attempts++;
    }
    
    return { questions, player1Questions, player2Questions };
  };
  
  const [questionsData] = useState(generateQuestions);
  const [timeLeft, setTimeLeft] = useState(gameMode === 'multi' ? 40 : 0); // 双人模式40秒
  const [gameEnded, setGameEnded] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // 单人模式状态
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentQuestionIndex: 0,
    selectedAnswer: null,
    isAnswered: false,
    score: 0,
    showExplanation: false,
    answerRecords: [],
  });

  // 双人模式状态 - 玩家1和玩家2
  const [player1State, setPlayer1State] = useState<PlayerState>({
    currentQuestionIndex: 0,
    selectedAnswer: null,
    isAnswered: false,
    score: 0,
    showExplanation: false,
    answerRecords: [],
  });

  const [player2State, setPlayer2State] = useState<PlayerState>({
    currentQuestionIndex: 0,
    selectedAnswer: null,
    isAnswered: false,
    score: 0,
    showExplanation: false,
    answerRecords: [],
  });

  // 赛跑状态
  const [racePosition1, setRacePosition1] = useState(0); // 玩家1赛跑位置 0-100
  const [racePosition2, setRacePosition2] = useState(0); // 玩家2赛跑位置 0-100

  // 学生名单（双人PK模式抽签用）- 从 localStorage 读取或使用默认值
  const [students, setStudents] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('game-students');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return ['聪聪', '明明', '小明', '小红', '小华'];
        }
      }
    }
    return ['聪聪', '明明', '小明', '小红', '小华'];
  });
  const [newStudentName, setNewStudentName] = useState('');

  // 抽签界面状态
  const [showDraw, setShowDraw] = useState(false);
  const [drawnPlayers, setDrawnPlayers] = useState<{ player1: string; player2: string } | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // 玩家名字（用于显示）- 从 localStorage 读取或使用默认值
  const [player1Name, setPlayer1Name] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('game-player1-name');
      return saved || '聪聪';
    }
    return '聪聪';
  });
  const [player2Name, setPlayer2Name] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('game-player2-name');
      return saved || '明明';
    }
    return '明明';
  });

  // 保存学生名单到 localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('game-students', JSON.stringify(students));
    }
  }, [students]);

  // 保存玩家名字到 localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('game-player1-name', player1Name);
    }
  }, [player1Name]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('game-player2-name', player2Name);
    }
  }, [player2Name]);

  // 游戏是否已开始（用于显示开始按钮）
  const [gameStarted, setGameStarted] = useState(false);

  // 显示视觉提示"3 2 1"
  const [showCountdown, setShowCountdown] = useState(false);

  // 游戏开始回调函数（在"开始"语音播放完成后调用）
  const startGameAfterVoice = () => {
    console.log('🎮 "开始"语音播放完成，游戏开始');
    setShowCountdown(false);
    setGameStarted(true);
  };

  // 滴答音效定时器ref
  const tickTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ========== 天梯赛模式状态 ==========
  const [ladderLevel, setLadderLevel] = useState(1); // 当前层数
  const [ladderMaxLevel, setLadderMaxLevel] = useState(1); // 最高达到的层数
  const [currentJudgeQuestion, setCurrentJudgeQuestion] = useState<JudgeQuestion | null>(null);
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 80 }); // 篮球位置（百分比）
  const [isBallThrown, setIsBallThrown] = useState(false); // 篮球是否已发射
  const [trajectoryOffset, setTrajectoryOffset] = useState({ x: 0, y: -30 }); // 虚拟抛物线偏移量（百分比）
  const [throwPower, setThrowPower] = useState(6.0); // 发射力度（范围2.0-16.0）
  const [ladderShowResult, setLadderShowResult] = useState(false); // 显示结果
  const [ladderResult, setLadderResult] = useState<'correct' | 'wrong' | null>(null); // 天梯赛结果
  const [animationId, setAnimationId] = useState<number | null>(null); // 动画ID
  const [isDragging, setIsDragging] = useState(false); // 是否正在拖拽轨迹
  const [ballRotation, setBallRotation] = useState(0); // 篮球旋转角度
  const gameAreaRef = useRef<HTMLDivElement | null>(null); // 游戏区域引用

  // 初始化天梯赛题目
  useEffect(() => {
    if (gameMode === 'ladder') {
      const question = getJudgeQuestionByLevel(ladderLevel);
      setCurrentJudgeQuestion(question);
      resetBall();
    }
  }, [gameMode, ladderLevel]);

  // 处理轨迹拖拽（同时调节方向和力度）
  useEffect(() => {
    if (!isDragging || gameMode !== 'ladder') return;

    // 获取容器位置信息（只查询一次）
    const container = gameAreaRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const handleMouseMove = (e: MouseEvent) => {
      // 直接使用缓存的尺寸信息，避免重复查询 DOM
      const x = ((e.clientX - rect.left) / width) * 100;
      const y = ((e.clientY - rect.top) / height) * 100;

      // 计算偏移量
      const offsetX = x - ballPosition.x;
      const offsetY = y - ballPosition.y;

      // 计算拖拽距离
      const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);

      // 限制水平方向范围（-45到45）
      const limitedOffsetX = Math.max(-45, Math.min(45, offsetX));

      // 限制垂直方向范围（-270到20）
      const limitedOffsetY = Math.max(-270, Math.min(20, offsetY));

      // 根据拖拽距离计算力度（距离越远，力度越大）
      // 最小距离约15%，最大距离约270%
      const normalizedDistance = Math.max(15, Math.min(270, distance));
      const newPower = 2.0 + ((normalizedDistance - 15) / 255) * 14; // 转换到2.0-16.0

      // 使用批处理更新，减少重新渲染次数
      setTrajectoryOffset({ x: limitedOffsetX, y: limitedOffsetY });
      setThrowPower(newPower);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    // 使用 passive: false 提高性能
    document.addEventListener('mousemove', handleMouseMove, { passive: false });
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, ballPosition.x, ballPosition.y, gameMode]);

  // 处理触摸拖拽（移动端，同时调节方向和力度）
  useEffect(() => {
    if (!isDragging || gameMode !== 'ladder') return;

    // 获取容器位置信息（只查询一次）
    const container = gameAreaRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();

      const touch = e.touches[0];
      // 直接使用缓存的尺寸信息，避免重复查询 DOM
      const x = ((touch.clientX - rect.left) / width) * 100;
      const y = ((touch.clientY - rect.top) / height) * 100;

      // 计算偏移量
      const offsetX = x - ballPosition.x;
      const offsetY = y - ballPosition.y;

      // 计算拖拽距离
      const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);

      // 限制水平方向范围（-45到45）
      const limitedOffsetX = Math.max(-45, Math.min(45, offsetX));

      // 限制垂直方向范围（-270到20）
      const limitedOffsetY = Math.max(-270, Math.min(20, offsetY));

      // 根据拖拽距离计算力度（距离越远，力度越大）
      // 最小距离约15%，最大距离约270%
      const normalizedDistance = Math.max(15, Math.min(270, distance));
      const newPower = 2.0 + ((normalizedDistance - 15) / 255) * 14; // 转换到2.0-16.0

      // 使用批处理更新，减少重新渲染次数
      setTrajectoryOffset({ x: limitedOffsetX, y: limitedOffsetY });
      setThrowPower(newPower);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, ballPosition.x, ballPosition.y, gameMode]);

  // 重置篮球位置
  const resetBall = () => {
    setBallPosition({ x: 50, y: 80 }); // 原始位置
    setIsBallThrown(false);
    setTrajectoryOffset({ x: 0, y: -30 }); // 原始轨迹偏移
    setThrowPower(6.0); // 重置力度到默认值
    setBallRotation(0); // 重置旋转角度
  };

  // ========== 天梯赛模式函数 ==========
  
  // 发射篮球
  const throwBall = () => {
    if (isBallThrown || gameMode !== 'ladder') return;

    setIsBallThrown(true);

    // 播放投篮球音效
    playSoundEffect('correct');

    // 计算初始速度（根据轨迹偏移量计算方向，使用可变力度）
    const targetX = ballPosition.x + trajectoryOffset.x;
    const targetY = ballPosition.y + trajectoryOffset.y;

    // 计算从篮球位置到目标点的方向
    const dx = targetX - ballPosition.x;
    const dy = targetY - ballPosition.y;

    // 计算距离
    const distance = Math.sqrt(dx * dx + dy * dy);

    // 使用当前力度，按方向标准化
    const velocityX = (dx / distance) * throwPower;
    const velocityY = (dy / distance) * throwPower;

    // 动画参数
    let currentX = ballPosition.x;
    let currentY = ballPosition.y;
    let currentVx = velocityX;
    let currentVy = velocityY;
    let rotation = ballRotation; // 篮球旋转角度
    const gravity = 0.15; // 重力加速度
    const dt = 1.0; // 时间步长
    const ballRadius = 3; // 篮球半径（百分比）

    // 开始动画
    const animate = () => {
      // 保存上一帧位置用于计算旋转
      const prevX = currentX;

      // 更新位置
      currentX += currentVx * dt;
      currentY += currentVy * dt;

      // 应用重力
      currentVy += gravity * dt;

      // 计算旋转角度（根据水平移动距离）
      const deltaX = currentX - prevX;
      // 滚动距离对应的旋转角度 = (移动距离 / 半径) * 180 / PI
      const rotationDelta = (deltaX / ballRadius) * (180 / Math.PI);
      rotation += rotationDelta;

      // 更新篮球位置和旋转
      setBallPosition({ x: currentX, y: currentY });
      setBallRotation(rotation);

      // 检测碰撞（只在篮筐高度附近检测）
      const hitResult = checkCollision(currentX, currentY);

      if (hitResult !== null) {
        // 命中篮筐
        handleLadderResult(hitResult);
        return;
      }

      // 检测是否落地（超过篮筐高度）
      if (currentY > 90) {
        // 落地但没有命中任何篮筐，重置篮球
        if (animationId) {
          cancelAnimationFrame(animationId);
          setAnimationId(null);
        }

        // 延迟后重置篮球，允许看到落地效果
        setTimeout(() => {
          resetBall();
        }, 500);

        return;
      }

      // 继续动画
      const id = requestAnimationFrame(animate);
      setAnimationId(id);
    };

    const id = requestAnimationFrame(animate);
    setAnimationId(id);
  };

  // 检测碰撞 - 返回玩家选择的篮筐
  const checkCollision = (x: number, y: number): 'left' | 'right' | null => {
    // 左篮筐（玩家认为正确）：x: 5-15（在左侧20%区域的中心），y: 30-40（flex items-center 居中位置，考虑容器布局）
    const leftHoop = { xMin: 5, xMax: 15, yMin: 30, yMax: 40 };
    // 右篮筐（玩家认为错误）：x: 85-95（在右侧20%区域的中心），y: 30-40（flex items-center 居中位置，考虑容器布局）
    const rightHoop = { xMin: 85, xMax: 95, yMin: 30, yMax: 40 };

    // 检测是否命中左篮筐
    if (x >= leftHoop.xMin && x <= leftHoop.xMax && y >= leftHoop.yMin && y <= leftHoop.yMax) {
      return 'left';
    }

    // 检测是否命中右篮筐
    if (x >= rightHoop.xMin && x <= rightHoop.xMax && y >= rightHoop.yMin && y <= rightHoop.yMax) {
      return 'right';
    }

    return null;
  };

  // 处理天梯赛结果
  const handleLadderResult = (playerChoice: 'left' | 'right') => {
    if (!currentJudgeQuestion) return;

    // 判断逻辑：玩家选择的答案与题目真实答案是否一致
    // 左篮筐 = 玩家认为正确，右篮筐 = 玩家认为错误
    const playerThinksCorrect = playerChoice === 'left';
    const isActuallyCorrect = currentJudgeQuestion.answer;

    // 玩家判断正确：玩家认为正确且确实正确，或认为错误且确实错误
    const isPlayerCorrect = playerThinksCorrect === isActuallyCorrect;

    const result = isPlayerCorrect ? 'correct' : 'wrong';
    setLadderResult(result);
    setLadderShowResult(true);

    // 播放结果音效
    playSoundEffect(result);

    // 停止动画
    if (animationId) {
      cancelAnimationFrame(animationId);
      setAnimationId(null);
    }

    // 2秒后处理层级变化
    setTimeout(() => {
      if (result === 'correct') {
        // 答对，进入下一层
        setLadderMaxLevel(prev => Math.max(prev, ladderLevel + 1));
        setLadderLevel(ladderLevel + 1);
      } else {
        // 答错，退回前一层（最低第一层）
        setLadderLevel(prev => Math.max(prev - 1, 1));
      }

      // 显示新题目
      const newQuestion = getJudgeQuestionByLevel(result === 'correct' ? ladderLevel + 1 : Math.max(ladderLevel - 1, 1));
      setCurrentJudgeQuestion(newQuestion);
      resetBall();
      setLadderShowResult(false);
      setLadderResult(null);
    }, 2000);
  };

  // 绘制抛物线
  const drawTrajectory = () => {
    if (isBallThrown) return null;

    const points: { x: number; y: number; opacity: number }[] = [];

    // 从篮球中心开始（与投篮逻辑完全一致）
    let x = ballPosition.x;
    let y = ballPosition.y;

    // 计算目标点（基于偏移量）
    const targetX = ballPosition.x + trajectoryOffset.x;
    const targetY = ballPosition.y + trajectoryOffset.y;

    // 计算方向向量（使用当前力度，与投篮逻辑一致）
    const dx = targetX - ballPosition.x;
    const dy = targetY - ballPosition.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const vx = (dx / distance) * throwPower;
    let vy = (dy / distance) * throwPower;
    const gravity = 0.15;
    const dt = 1.0;

    // 预测30个点，根据力度调整点数（力度越大，轨迹越长）
    const pointCount = Math.min(30, 10 + Math.floor(throwPower * 3));

    for (let i = 0; i < pointCount; i++) {
      x += vx * dt;
      y += vy * dt;
      vy += gravity * dt;

      // 计算透明度：越远越透明
      const opacity = Math.max(0.1, 1 - (i / pointCount));
      points.push({ x, y, opacity });

      // 提前停止如果超出屏幕
      if (y > 90 || x < 0 || x > 100) break;
    }

    return points;
  };

  // 最后5秒语音倒计时（仅双人模式）
  useEffect(() => {
    if (gameMode === 'multi' && timeLeft <= 5 && timeLeft > 0 && !gameEnded) {
      console.log(`⏰ 倒计时: ${timeLeft}`);
      playCountdownNumber(timeLeft);
    }
  }, [gameMode, timeLeft, gameEnded]);

  // 添加学生
  const handleAddStudent = () => {
    if (newStudentName.trim() && !students.includes(newStudentName.trim())) {
      setStudents([...students, newStudentName.trim()]);
      setNewStudentName('');
    }
  };

  // 删除学生
  const handleDeleteStudent = (name: string) => {
    setStudents(students.filter(s => s !== name));
  };

  // 随机抽签
  const handleDrawPlayers = () => {
    if (students.length < 2) {
      alert('学生名单至少需要2人才能抽签！');
      return;
    }

    setIsDrawing(true);

    // 动画效果，快速切换名字
    let count = 0;
    const interval = setInterval(() => {
      const shuffled = shuffleArray([...students]);
      if (shuffled.length >= 2) {
        setDrawnPlayers({
          player1: shuffled[0],
          player2: shuffled[1]
        });
      }
      count++;

      // 15次动画后停止
      if (count >= 15) {
        clearInterval(interval);
        setIsDrawing(false);
      }
    }, 100);
  };

  // 确认抽签结果
  const handleConfirmDraw = () => {
    if (drawnPlayers) {
      setPlayer1Name(drawnPlayers.player1);
      setPlayer2Name(drawnPlayers.player2);
      setShowDraw(false);
      setDrawnPlayers(null);
    }
  };

  // 倒计时（仅双人模式）
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (gameMode === 'multi' && timeLeft > 0 && !gameEnded) {
      // 启动滴答音效
      if (!tickTimerRef.current) {
        const tickTimer = setInterval(() => {
          playTickSound();
        }, 1000); // 每秒播放一次
        tickTimerRef.current = tickTimer;
      }

      // 倒计时
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // 立即停止滴答音效
            if (tickTimerRef.current) {
              clearInterval(tickTimerRef.current);
              tickTimerRef.current = null;
            }
            setGameEnded(true);
            setShowResult(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // 清理滴答音效定时器
    return () => {
      if (timer) {
        clearInterval(timer);
      }
      if (tickTimerRef.current && !gameEnded) {
        clearInterval(tickTimerRef.current);
        tickTimerRef.current = null;
      }
    };
  }, [gameMode, timeLeft, gameEnded]);

  // 赛跑动画（仅双人模式）
  useEffect(() => {
    if (gameMode === 'multi' && !gameEnded) {
      const animationFrame = setInterval(() => {
        setRacePosition1((prev) => Math.min(prev + 0.05, 100)); // 自动前进
        setRacePosition2((prev) => Math.min(prev + 0.05, 100)); // 自动前进
      }, 100); // 每100ms更新一次
      return () => clearInterval(animationFrame);
    }
  }, [gameMode, gameEnded]);

  // 单人模式处理函数
  const handleSingleAnswer = (answerIndex: number) => {
    if (playerState.isAnswered) return;

    const currentQuestion = questionsData.questions[playerState.currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.answer;
    const newScore = isCorrect ? playerState.score + 1 : playerState.score;

    // 播放音效
    playSoundEffect(isCorrect ? 'correct' : 'wrong');

    setPlayerState({
      ...playerState,
      selectedAnswer: answerIndex,
      isAnswered: true,
      showExplanation: true,
      score: newScore,
    });
  };

  const handleSingleNext = () => {
    if (playerState.currentQuestionIndex < questionsData.questions.length - 1) {
      setPlayerState({
        currentQuestionIndex: playerState.currentQuestionIndex + 1,
        selectedAnswer: null,
        isAnswered: false,
        score: playerState.score,
        showExplanation: false,
        answerRecords: playerState.answerRecords,
      });
    } else {
      setGameEnded(true);
      setShowResult(true);
    }
  };

  // 双人模式处理函数
  const handleMultiAnswer = (player: 1 | 2, answerIndex: number) => {
    const state = player === 1 ? player1State : player2State;
    const setState = player === 1 ? setPlayer1State : setPlayer2State;
    const playerQuestions = player === 1 ? questionsData.player1Questions : questionsData.player2Questions;
    const otherState = player === 1 ? player2State : player1State;

    if (state.isAnswered) return;

    const currentQuestion = playerQuestions[state.currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.answer;
    const newScore = isCorrect ? state.score + 1 : state.score;

    // 播放音效
    playSoundEffect(isCorrect ? 'correct' : 'wrong');

    // 答对题目时，小动物额外前进
    if (isCorrect) {
      if (player === 1) {
        setRacePosition1((prev) => Math.min(prev + 8, 100)); // 答对前进8%
      } else {
        setRacePosition2((prev) => Math.min(prev + 8, 100)); // 答对前进8%
      }
    }

    // 记录答题
    const newAnswerRecord: AnswerRecord = {
      question: currentQuestion,
      userAnswer: answerIndex,
      isCorrect,
    };

    // 先显示对错反馈
    setState({
      currentQuestionIndex: state.currentQuestionIndex,
      selectedAnswer: answerIndex,
      isAnswered: true,
      score: newScore,
      showExplanation: true,
      answerRecords: [...state.answerRecords, newAnswerRecord],
    });

    // 延迟1秒后跳到下一题
    setTimeout(() => {
      const nextQuestionIndex = state.currentQuestionIndex + 1;
      const isLastQuestion = nextQuestionIndex >= playerQuestions.length;

      setState({
        currentQuestionIndex: nextQuestionIndex,
        selectedAnswer: null,
        isAnswered: false,
        score: newScore,
        showExplanation: false,
        answerRecords: [...state.answerRecords, newAnswerRecord],
      });

      // 检查是否两个玩家都完成了
      const currentOtherState = player === 1 ? player2State : player1State;
      if (isLastQuestion && currentOtherState.currentQuestionIndex >= playerQuestions.length) {
        setGameEnded(true);
        setShowResult(true);
      }
    }, 1000); // 1秒后跳转
  };

  const handleRestart = () => {
    // 清理滴答音效定时器
    if (tickTimerRef.current) {
      clearInterval(tickTimerRef.current);
      tickTimerRef.current = null;
    }

    // 重置游戏未开始状态
    setGameStarted(false);
    setShowCountdown(false);

    setPlayerState({
      currentQuestionIndex: 0,
      selectedAnswer: null,
      isAnswered: false,
      score: 0,
      showExplanation: false,
      answerRecords: [],
    });

    setPlayer1State({
      currentQuestionIndex: 0,
      selectedAnswer: null,
      isAnswered: false,
      score: 0,
      showExplanation: false,
      answerRecords: [],
    });

    setPlayer2State({
      currentQuestionIndex: 0,
      selectedAnswer: null,
      isAnswered: false,
      score: 0,
      showExplanation: false,
      answerRecords: [],
    });

    // 重置赛跑位置
    setRacePosition1(0);
    setRacePosition2(0);

    setGameEnded(false);
    setTimeLeft(gameMode === 'multi' ? 40 : 0);
    setShowResult(false);
  };

  // 结果界面
  if (showResult) {
    if (gameMode === 'single') {
      const totalScore = Math.round((playerState.score / questionsData.questions.length) * 100);
      return (
        <ResultSingle
          totalScore={totalScore}
          correctCount={playerState.score}
          totalCount={questionsData.questions.length}
          questionType={questionType}
          onRestart={handleRestart}
          onBack={onBack}
        />
      );
    } else {
      const player1Score = Math.round((player1State.score / questionsData.player1Questions.length) * 100);
      const player2Score = Math.round((player2State.score / questionsData.player2Questions.length) * 100);
      return (
        <ResultMulti
          player1Score={player1Score}
          player2Score={player2Score}
          player1Correct={player1State.score}
          player2Correct={player2State.score}
          player1AnswerRecords={player1State.answerRecords}
          player2AnswerRecords={player2State.answerRecords}
          totalCount={questionsData.player1Questions.length}
          questionType={questionType}
          onRestart={handleRestart}
          onBack={onBack}
          player1Name={player1Name}
          player2Name={player2Name}
        />
      );
    }
  }

  // 如果游戏还未开始，显示开始按钮
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 flex items-center justify-center p-4">
        {/* 321 视觉提示 */}
        {showCountdown && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="text-center animate-pulse">
              <h1 className="text-9xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl mb-4">
                3 2 1
              </h1>
              <h1 className="text-7xl font-bold text-white drop-shadow-2xl">
                开始
              </h1>
            </div>
          </div>
        )}

        <div className="max-w-2xl w-full">
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="text-3xl text-center">
                {gameMode === 'single' ? '单人模式' : '双人PK模式'}
              </CardTitle>
              <CardDescription className="text-center text-lg">
                {getQuestionTypeName(questionType)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {gameMode === 'multi' && (
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">⚠️ 注意</p>
                  <p className="text-amber-700 dark:text-amber-300">
                    双人PK模式限时40秒，答对题目可以让小动物加速！
                  </p>
                </div>
              )}

              {gameMode === 'ladder' && (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">🎯 天梯赛说明</p>
                  <ul className="text-emerald-700 dark:text-emerald-300 space-y-1 text-sm">
                    <li>• 答对进入下一层，答错退回前一层（最低第1层）</li>
                    <li>• 左篮筐代表正确，右篮筐代表错误</li>
                    <li>• 拖拽蓝色轨迹线调整方向，点击屏幕可快速定位</li>
                    <li>• 发射力度固定，只需调整投篮方向</li>
                    <li>• 未投进篮筐会自动重置，可重新投掷</li>
                    <li>• 越到高层题目难度越大，加油！</li>
                  </ul>
                </div>
              )}

              {/* 双人模式显示抽签按钮和当前玩家 */}
              {gameMode === 'multi' && (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <Users className="w-4 h-4 inline mr-1" />
                      当前对战选手
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-1">
                          <span className="text-blue-600 dark:text-blue-400 font-bold">{player1Name[0]}</span>
                        </div>
                        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{player1Name}</p>
                      </div>
                      <span className="text-2xl font-bold text-gray-400">VS</span>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mb-1">
                          <span className="text-pink-600 dark:text-pink-400 font-bold">{player2Name[0]}</span>
                        </div>
                        <p className="text-sm font-semibold text-pink-600 dark:text-pink-400">{player2Name}</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => setShowDraw(true)}
                    variant="outline"
                    className="w-full"
                  >
                    <Shuffle className="w-4 h-4 mr-2" />
                    随机抽签
                  </Button>
                </div>
              )}

              <Button
                onClick={() => {
                  // 双人PK模式播放321语音和显示视觉提示
                  if (gameMode === 'multi') {
                    // 播放321语音
                    play321(() => {
                      // 语音播放完成后，隐藏视觉提示并开始游戏
                      startGameAfterVoice();
                    });

                    // 显示321视觉提示
                    setShowCountdown(true);
                  } else {
                    // 单人模式直接开始
                    setGameStarted(true);
                  }
                }}
                className="w-full text-lg py-6"
                size="lg"
              >
                开始挑战
              </Button>

              <Button onClick={onBack} variant="outline" className="w-full">
                返回主菜单
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 抽签界面 */}
        {showDraw && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                  <Shuffle className="w-6 h-6 text-purple-600" />
                  随机抽签
                </CardTitle>
                <CardDescription className="text-center">
                  管理班级学生名单，随机抽取两名对战选手
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 学生名单管理 */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">学生名单 ({students.length}人)</h3>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={newStudentName}
                        onChange={(e) => setNewStudentName(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddStudent()}
                        placeholder="输入学生姓名"
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        maxLength={10}
                      />
                      <Button onClick={handleAddStudent} size="sm">
                        <Plus className="w-4 h-4 mr-1" />
                        添加
                      </Button>
                    </div>

                    {/* 学生列表 */}
                    <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                      {students.map((student) => (
                        <div
                          key={student}
                          className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                        >
                          <span>{student}</span>
                          <button
                            onClick={() => handleDeleteStudent(student)}
                            className="hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 抽签按钮 */}
                  {students.length >= 2 ? (
                    <Button
                      onClick={handleDrawPlayers}
                      disabled={isDrawing}
                      className="w-full"
                      size="lg"
                    >
                      <Shuffle className={`w-5 h-5 mr-2 ${isDrawing ? 'animate-spin' : ''}`} />
                      {isDrawing ? '正在抽签...' : '开始抽签'}
                    </Button>
                  ) : (
                    <Button disabled className="w-full">
                      至少需要2名学生才能抽签
                    </Button>
                  )}
                </div>

                {/* 抽签结果 */}
                {drawnPlayers && (
                  <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-700">
                    <h3 className="text-xl font-bold text-center mb-4">抽签结果</h3>
                    <div className="flex items-center justify-center gap-8">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-2 shadow-lg">
                          <span className="text-3xl font-bold text-white">{drawnPlayers.player1[0]}</span>
                        </div>
                        <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{drawnPlayers.player1}</p>
                      </div>

                      <div className="text-4xl font-bold text-gray-400">VS</div>

                      <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mb-2 shadow-lg">
                          <span className="text-3xl font-bold text-white">{drawnPlayers.player2[0]}</span>
                        </div>
                        <p className="text-xl font-bold text-pink-600 dark:text-pink-400">{drawnPlayers.player2}</p>
                      </div>
                    </div>

                    {!isDrawing && (
                      <div className="flex gap-4 mt-6">
                        <Button onClick={handleConfirmDraw} className="flex-1">
                          确认使用
                        </Button>
                        <Button
                          onClick={() => setDrawnPlayers(null)}
                          variant="outline"
                          className="flex-1"
                        >
                          重新抽取
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* 关闭按钮 */}
                <Button
                  onClick={() => {
                    setShowDraw(false);
                    setDrawnPlayers(null);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  关闭
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  }

  // 天梯赛模式界面
  if (gameMode === 'ladder') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-emerald-900 dark:to-teal-900 p-4 relative overflow-hidden">
        {/* 顶部信息栏 */}
        <div className="max-w-7xl mx-auto mb-4 z-10 relative">
          <div className="flex items-center justify-between">
            <Button onClick={onBack} variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回
            </Button>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow">
                <Trophy className="w-5 h-5 text-yellow-600" />
                <span className="font-bold">第 {ladderLevel} 层</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow">
                <Crown className="w-5 h-5 text-purple-600" />
                <span className="text-sm">最高: {ladderMaxLevel} 层</span>
              </div>
            </div>
          </div>
        </div>

        {/* 题目显示区 */}
        <div className="max-w-4xl mx-auto mb-6 z-10 relative">
          <Card className="shadow-xl border-2 border-green-200 dark:border-green-700">
            <CardHeader>
              <CardTitle className="text-xl text-center text-green-700 dark:text-green-300">
                请判断以下说法的正确性
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-center py-6">
                {currentJudgeQuestion?.question}
              </p>
              <div className="flex justify-center gap-8 mt-4">
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-bold">正确 → 投左篮筐</span>
                </div>
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <XCircle className="w-6 h-6" />
                  <span className="font-bold">错误 → 投右篮筐</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 游戏区域 */}
        <div
          ref={gameAreaRef}
          className="max-w-6xl mx-auto relative h-[500px] z-10"
          data-game-area="true"
          onClick={(e) => {
            if (isBallThrown || ladderShowResult) return;

            const container = e.currentTarget;
            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            // 计算偏移量
            const offsetX = x - ballPosition.x;
            const offsetY = y - ballPosition.y;

            // 计算距离
            const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);

            // 限制偏移范围
            const newOffsetX = Math.max(-45, Math.min(45, offsetX));
            const newOffsetY = Math.max(-270, Math.min(20, offsetY));

            // 根据距离计算力度
            const normalizedDistance = Math.max(15, Math.min(270, distance));
            const newPower = 2.0 + ((normalizedDistance - 15) / 255) * 14;

            setTrajectoryOffset({ x: newOffsetX, y: newOffsetY });
            setThrowPower(newPower);
          }}
          onTouchStart={(e) => {
            if (isBallThrown || ladderShowResult) return;

            const touch = e.touches[0];
            const container = e.currentTarget;
            const rect = container.getBoundingClientRect();
            const x = ((touch.clientX - rect.left) / rect.width) * 100;
            const y = ((touch.clientY - rect.top) / rect.height) * 100;

            // 计算偏移量
            const offsetX = x - ballPosition.x;
            const offsetY = y - ballPosition.y;

            // 计算距离
            const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);

            // 限制偏移范围
            const newOffsetX = Math.max(-45, Math.min(45, offsetX));
            const newOffsetY = Math.max(-270, Math.min(20, offsetY));

            // 根据距离计算力度
            const normalizedDistance = Math.max(15, Math.min(270, distance));
            const newPower = 2.0 + ((normalizedDistance - 15) / 255) * 14;

            setTrajectoryOffset({ x: newOffsetX, y: newOffsetY });
            setThrowPower(newPower);
          }}
        >
          {/* 左篮筐（正确） */}
          <div className="absolute left-0 top-0 w-[20%] h-full flex items-center justify-center">
            <div className="relative">
              {/* 篮板 */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-36 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded border-2 border-gray-300 dark:border-gray-600 shadow-xl overflow-hidden">
                {/* 篮板内框 */}
                <div className="absolute inset-4 border-2 border-green-500/50 rounded"></div>
                {/* 玻璃反光效果 */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent"></div>
              </div>

              {/* 篮筐主体 */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-28 h-4 relative">
                {/* 篮筐环 - 金属质感 */}
                <div className="absolute inset-0 border-[5px] border-green-600 rounded-full shadow-2xl"
                     style={{
                       background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)',
                       boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3), 0 4px 12px rgba(0,0,0,0.3)'
                     }}>
                </div>

                {/* 篮网 - 使用渐变和条纹模拟 */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-24 h-16 overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 100 80" preserveAspectRatio="none">
                    {/* 篮网线条 */}
                    <defs>
                      <linearGradient id="netGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.8 }} />
                        <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0.3 }} />
                      </linearGradient>
                    </defs>
                    {/* 垂直线 */}
                    <line x1="10" y1="0" x2="15" y2="80" stroke="url(#netGradient)" strokeWidth="1" />
                    <line x1="25" y1="0" x2="30" y2="80" stroke="url(#netGradient)" strokeWidth="1" />
                    <line x1="40" y1="0" x2="45" y2="80" stroke="url(#netGradient)" strokeWidth="1" />
                    <line x1="55" y1="0" x2="50" y2="80" stroke="url(#netGradient)" strokeWidth="1" />
                    <line x1="70" y1="0" x2="75" y2="80" stroke="url(#netGradient)" strokeWidth="1" />
                    <line x1="85" y1="0" x2="90" y2="80" stroke="url(#netGradient)" strokeWidth="1" />
                    {/* 水平线 */}
                    <line x1="10" y1="20" x2="90" y2="20" stroke="url(#netGradient)" strokeWidth="1" />
                    <line x1="12" y1="40" x2="88" y2="40" stroke="url(#netGradient)" strokeWidth="1" />
                    <line x1="14" y1="60" x2="86" y2="60" stroke="url(#netGradient)" strokeWidth="1" />
                  </svg>
                </div>

                {/* 篮筐支架 */}
                <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-2 h-20 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full shadow-md"></div>
              </div>

              <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-center">
                <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-2" />
                <span className="font-bold text-green-700 dark:text-green-300">正确</span>
              </div>
            </div>
          </div>

          {/* 右篮筐（错误） */}
          <div className="absolute right-0 top-0 w-[20%] h-full flex items-center justify-center">
            <div className="relative">
              {/* 篮板 */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-36 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded border-2 border-gray-300 dark:border-gray-600 shadow-xl overflow-hidden">
                {/* 篮板内框 */}
                <div className="absolute inset-4 border-2 border-red-500/50 rounded"></div>
                {/* 玻璃反光效果 */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent"></div>
              </div>

              {/* 篮筐主体 */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-28 h-4 relative">
                {/* 篮筐环 - 金属质感 */}
                <div className="absolute inset-0 border-[5px] border-red-600 rounded-full shadow-2xl"
                     style={{
                       background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
                       boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3), 0 4px 12px rgba(0,0,0,0.3)'
                     }}>
                </div>

                {/* 篮网 - 使用渐变和条纹模拟 */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-24 h-16 overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 100 80" preserveAspectRatio="none">
                    {/* 篮网线条 */}
                    <defs>
                      <linearGradient id="netGradientRight" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.8 }} />
                        <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0.3 }} />
                      </linearGradient>
                    </defs>
                    {/* 垂直线 */}
                    <line x1="10" y1="0" x2="15" y2="80" stroke="url(#netGradientRight)" strokeWidth="1" />
                    <line x1="25" y1="0" x2="30" y2="80" stroke="url(#netGradientRight)" strokeWidth="1" />
                    <line x1="40" y1="0" x2="45" y2="80" stroke="url(#netGradientRight)" strokeWidth="1" />
                    <line x1="55" y1="0" x2="50" y2="80" stroke="url(#netGradientRight)" strokeWidth="1" />
                    <line x1="70" y1="0" x2="75" y2="80" stroke="url(#netGradientRight)" strokeWidth="1" />
                    <line x1="85" y1="0" x2="90" y2="80" stroke="url(#netGradientRight)" strokeWidth="1" />
                    {/* 水平线 */}
                    <line x1="10" y1="20" x2="90" y2="20" stroke="url(#netGradientRight)" strokeWidth="1" />
                    <line x1="12" y1="40" x2="88" y2="40" stroke="url(#netGradientRight)" strokeWidth="1" />
                    <line x1="14" y1="60" x2="86" y2="60" stroke="url(#netGradientRight)" strokeWidth="1" />
                  </svg>
                </div>

                {/* 篮筐支架 */}
                <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-2 h-20 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full shadow-md"></div>
              </div>

              <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-center">
                <XCircle className="w-12 h-12 text-red-600 dark:text-red-400 mx-auto mb-2" />
                <span className="font-bold text-red-700 dark:text-red-300">错误</span>
              </div>
            </div>
          </div>

          {/* 篮球 - 3D效果 */}
          <div
            className="absolute w-12 h-12 rounded-full shadow-2xl"
            style={{
              left: `${ballPosition.x}%`,
              top: `${ballPosition.y}%`,
              transform: `translate(-50%, -50%) rotate(${ballRotation}deg)`,
              background: `
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 20%),
                radial-gradient(circle at 70% 70%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 20%),
                radial-gradient(circle at 50% 50%, #ff8c00 0%, #ff6600 50%, #cc5500 100%)
              `,
              border: '3px solid #cc5500',
              boxShadow: `
                inset -4px -4px 10px rgba(0,0,0,0.3),
                inset 4px 4px 10px rgba(255,255,255,0.2),
                0 10px 30px rgba(0,0,0,0.5)
              `,
            }}
          >
            {/* 篮球纹理 - 3D效果 */}
            <div className="absolute inset-0 flex items-center justify-center rounded-full overflow-hidden">
              {/* 水平线 */}
              <div className="absolute w-full h-0.5 bg-[#8b4513] shadow-[0_1px_2px_rgba(0,0,0,0.5)]"></div>
              {/* 垂直线 */}
              <div className="absolute w-0.5 h-full bg-[#8b4513] shadow-[1px_0_2px_rgba(0,0,0,0.5)]"></div>
              {/* 左弧线 */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-1/2 border-t-2 border-b-2 border-[#8b4513] rounded-r-full" style={{ borderWidth: '2px', borderLeft: 'none' }}></div>
              {/* 右弧线 */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-1/2 border-t-2 border-b-2 border-[#8b4513] rounded-l-full" style={{ borderWidth: '2px', borderRight: 'none' }}></div>
              {/* 额外的弧线增强3D感 */}
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-[#8b4513]/30 rounded-full" style={{ transform: 'rotate(-30deg)' }}></div>
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-[#8b4513]/30 rounded-full" style={{ transform: 'rotate(30deg)' }}></div>
            </div>
            {/* 高光效果 */}
            <div
              className="absolute rounded-full"
              style={{
                width: '30%',
                height: '30%',
                top: '20%',
                left: '20%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)',
              }}
            ></div>
          </div>

          {/* 抛物线预览 */}
          {!isBallThrown && (
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ zIndex: 5 }}>
              {/* 轨迹线 - 颜色根据力度变化（蓝色=低力度，红色=高力度） */}
              <polyline
                points={drawTrajectory()
                  ?.map(p => `${p.x},${p.y}`)
                  .join(' ')}
                fill="none"
                stroke={throwPower < 6 ? 'rgba(59, 130, 246, 0.7)' : throwPower < 10 ? 'rgba(249, 115, 22, 0.7)' : 'rgba(239, 68, 68, 0.7)'}
                strokeWidth="0.8"
                strokeDasharray="2,1"
              />
              {/* 轨迹终点指示点和力度显示 */}
              {drawTrajectory() && drawTrajectory()!.length > 0 && (
                <>
                  <circle
                    cx={drawTrajectory()![drawTrajectory()!.length - 1].x}
                    cy={drawTrajectory()![drawTrajectory()!.length - 1].y}
                    r="1.5"
                    fill={throwPower < 6 ? 'rgba(59, 130, 246, 0.9)' : throwPower < 10 ? 'rgba(249, 115, 22, 0.9)' : 'rgba(239, 68, 68, 0.9)'}
                    className="cursor-move"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                  />
                  {/* 力度指示箭头 */}
                  {(() => {
                    const lastPoint = drawTrajectory()![drawTrajectory()!.length - 1];
                    const arrowLength = (throwPower / 16) * 6; // 根据力度计算箭头长度
                    const angle = Math.atan2(
                      lastPoint.y - ballPosition.y,
                      lastPoint.x - ballPosition.x
                    );
                    const arrowX = lastPoint.x + Math.cos(angle) * arrowLength;
                    const arrowY = lastPoint.y + Math.sin(angle) * arrowLength;
                    return (
                      <line
                        x1={lastPoint.x}
                        y1={lastPoint.y}
                        x2={arrowX}
                        y2={arrowY}
                        stroke={throwPower < 6 ? '#3b82f6' : throwPower < 10 ? '#f97316' : '#ef4444'}
                        strokeWidth="0.8"
                        markerEnd="url(#arrowhead)"
                      />
                    );
                  })()}
                  {/* 箭头标记定义 */}
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="10"
                      refX="9"
                      refY="3"
                      orient="auto"
                    >
                      <polygon
                        points="0 0, 10 3, 0 6"
                        fill={throwPower < 6 ? '#3b82f6' : throwPower < 10 ? '#f97316' : '#ef4444'}
                      />
                    </marker>
                  </defs>
                </>
              )}
            </svg>
          )}



          {/* 控制面板 */}
          {!isBallThrown && !ladderShowResult && (
            <button
              onClick={throwBall}
              className="absolute bottom-6 right-6 w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold shadow-2xl z-20 flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
            >
              <span className="text-4xl">🏀</span>
            </button>
          )}

          {/* 结果提示 */}
          {ladderShowResult && (
            <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/50 rounded-lg">
              <Card className="shadow-2xl transform scale-110 animate-bounce">
                <CardContent className="p-8 text-center">
                  {ladderResult === 'correct' ? (
                    <>
                      <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                      <h2 className="text-3xl font-bold text-green-600 mb-2">回答正确！</h2>
                      <p className="text-lg text-gray-600 mb-2">进入第 {ladderLevel + 1} 层</p>
                      {currentJudgeQuestion && (
                        <p className="text-sm text-gray-500 mt-4">{currentJudgeQuestion.explanation}</p>
                      )}
                    </>
                  ) : (
                    <>
                      <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
                      <h2 className="text-3xl font-bold text-red-600 mb-2">回答错误！</h2>
                      <p className="text-lg text-gray-600 mb-2">退回第 {Math.max(ladderLevel - 1, 1)} 层</p>
                      {currentJudgeQuestion && (
                        <p className="text-sm text-gray-500 mt-4">{currentJudgeQuestion.explanation}</p>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 双人PK模式界面
  if (gameMode === 'multi') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 p-4">
        {/* 顶部信息栏 */}
        <div className="max-w-7xl mx-auto mb-6">
          <div className="flex items-center justify-between">
            <Button onClick={onBack} variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回
            </Button>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md">
                <Clock className="w-5 h-5 text-red-500" />
                <span className="font-bold text-xl text-gray-700 dark:text-gray-300">
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* PK对战标题 */}
        <div className="max-w-7xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            双人对战 - {getQuestionTypeName(questionType)}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">两位选手同时答题，分数高者获胜！</p>
        </div>

        {/* 赛跑动画 */}
        <div className="max-w-7xl mx-auto mb-6">
          <RaceTrack
            position1={racePosition1}
            position2={racePosition2}
            player1Name={player1Name}
            player2Name={player2Name}
          />
        </div>

        {/* 双人答题区域 */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {/* 玩家1区域 */}
          <PlayerArea
            playerName={player1Name}
            playerColor="blue"
            questions={questionsData.player1Questions}
            playerState={player1State}
            onAnswer={(answer) => handleMultiAnswer(1, answer)}
            onNext={() => {}}
            questionType={questionType}
            showExplanationAndNextButton={false}
          />

          {/* VS分隔符 */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white font-bold text-3xl px-6 py-3 rounded-full shadow-2xl">
              VS
            </div>
          </div>

          {/* 玩家2区域 */}
          <PlayerArea
            playerName={player2Name}
            playerColor="pink"
            questions={questionsData.player2Questions}
            playerState={player2State}
            onAnswer={(answer) => handleMultiAnswer(2, answer)}
            onNext={() => {}}
            questionType={questionType}
            showExplanationAndNextButton={false}
          />
        </div>

        {/* 移动端VS显示 */}
        <div className="md:hidden text-center mt-6">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white font-bold text-2xl px-6 py-3 rounded-full shadow-2xl inline-block">
            VS
          </div>
        </div>
      </div>
    );
  }

  // 单人模式界面
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        {/* 顶部信息栏 */}
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回
          </Button>

          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              {Math.round((playerState.score / questionsData.questions.length) * 100)}分
            </span>
          </div>
        </div>

        <PlayerArea
          playerName="单人模式"
          playerColor="blue"
          questions={questionsData.questions}
          playerState={playerState}
          onAnswer={handleSingleAnswer}
          onNext={handleSingleNext}
          questionType={questionType}
        />
      </div>
    </div>
  );
}

// 玩家答题区域组件
function PlayerArea({
  playerName,
  playerColor,
  questions,
  playerState,
  onAnswer,
  onNext,
  questionType,
  showExplanationAndNextButton = true,
}: {
  playerName: string;
  playerColor: 'blue' | 'pink';
  questions: Question[];
  playerState: PlayerState;
  onAnswer: (answerIndex: number) => void;
  onNext: () => void;
  questionType: QuestionType;
  showExplanationAndNextButton?: boolean;
}) {
  const currentQuestion = questions[playerState.currentQuestionIndex];
  const progress = ((playerState.currentQuestionIndex + (playerState.isAnswered ? 1 : 0)) / questions.length) * 100;
  const totalScore = Math.round((playerState.score / questions.length) * 100);

  const colorClasses = {
    blue: {
      border: 'border-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      text: 'text-blue-600 dark:text-blue-400',
      badge: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
    },
    pink: {
      border: 'border-pink-400',
      bg: 'bg-pink-50 dark:bg-pink-900/20',
      text: 'text-pink-600 dark:text-pink-400',
      badge: 'bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400',
    },
  };

  const colors = colorClasses[playerColor];

  return (
    <div className="flex flex-col">
      {/* 玩家信息卡片 */}
      <Card className={`mb-4 border-2 ${colors.border}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
              <Crown className={`w-5 h-5 ${colors.text}`} />
              {playerName}
            </CardTitle>
            <div className="flex items-center gap-3">
              <div className={`px-3 py-1 ${colors.badge} rounded-full text-sm`}>
                {totalScore}分
              </div>
              <div className={`px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm`}>
                第 {playerState.currentQuestionIndex + 1}/{questions.length}题
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* 题目卡片 */}
      <Card className="shadow-xl flex-1">
        <CardHeader>
          <CardTitle className="text-xl">{getQuestionTypeName(questionType)}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 题目 */}
          <div className={`p-4 ${colors.bg} rounded-xl`}>
            <p className="text-base leading-relaxed text-gray-800 dark:text-white">
              {currentQuestion?.question}
            </p>
          </div>

          {/* 选项 */}
          <div className="space-y-2">
            {currentQuestion?.options.map((option, index) => {
              const isSelected = playerState.selectedAnswer === index;
              const isCorrect = index === currentQuestion.answer;
              const isWrong = isSelected && !isCorrect;

              let buttonStyle = 'hover:bg-gray-50 dark:hover:bg-gray-800';
              if (playerState.isAnswered) {
                if (isCorrect) {
                  buttonStyle = 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-300';
                } else if (isWrong) {
                  buttonStyle = 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-300';
                } else {
                  buttonStyle = 'opacity-50';
                }
              } else if (isSelected) {
                buttonStyle = `${colors.bg} ${colors.border}`;
              }

              return (
                <button
                  key={index}
                  onClick={() => onAnswer(index)}
                  disabled={playerState.isAnswered}
                  className={`w-full p-3 text-left rounded-xl border-2 transition-all duration-200 ${buttonStyle}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-gray-800 dark:text-white text-sm">{option}</span>
                    {playerState.isAnswered && isCorrect && (
                      <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                    )}
                    {playerState.isAnswered && isWrong && (
                      <XCircle className="w-5 h-5 text-red-500 ml-auto" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 解析 */}
          {showExplanationAndNextButton && playerState.showExplanation && (
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">解析：</span>
                {currentQuestion?.explanation}
              </p>
            </div>
          )}

          {/* 下一题按钮 */}
          {showExplanationAndNextButton && playerState.isAnswered && (
            <Button onClick={onNext} className="w-full" size="default">
              {playerState.currentQuestionIndex < questions.length - 1 ? '下一题' : '完成'}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// 单人模式结果组件
function ResultSingle({
  totalScore,
  correctCount,
  totalCount,
  questionType,
  onRestart,
  onBack,
}: {
  totalScore: number;
  correctCount: number;
  totalCount: number;
  questionType: QuestionType;
  onRestart: () => void;
  onBack: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="text-3xl text-center flex items-center justify-center gap-2">
              <Trophy className="w-8 h-8 text-yellow-500" />
              挑战完成
            </CardTitle>
            <CardDescription className="text-center text-lg">
              单人模式 - {getQuestionTypeName(questionType)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 分数显示 */}
            <div className="text-center">
              <p className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {totalScore}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                总得分 / 100分
              </p>
            </div>

            {/* 统计信息 */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{correctCount}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">正确</p>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {totalCount - correctCount}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">错误</p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {totalCount}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">总题数</p>
              </div>
            </div>

            {/* 评价 */}
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <p className="text-center text-lg font-semibold text-amber-700 dark:text-amber-300">
                {getResultComment(totalScore)}
              </p>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-4">
              <Button onClick={onBack} variant="outline" className="flex-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回主菜单
              </Button>
              <Button onClick={onRestart} className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" />
                再来一次
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// 双人PK结果组件
function ResultMulti({
  player1Score,
  player2Score,
  player1Correct,
  player2Correct,
  player1AnswerRecords,
  player2AnswerRecords,
  totalCount,
  questionType,
  onRestart,
  onBack,
  player1Name,
  player2Name,
}: {
  player1Score: number;
  player2Score: number;
  player1Correct: number;
  player2Correct: number;
  player1AnswerRecords: AnswerRecord[];
  player2AnswerRecords: AnswerRecord[];
  totalCount: number;
  questionType: QuestionType;
  onRestart: () => void;
  onBack: () => void;
  player1Name: string;
  player2Name: string;
}) {
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
  const winner = player1Score > player2Score ? 1 : player2Score > player1Score ? 2 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="text-3xl text-center flex items-center justify-center gap-2">
              <Trophy className="w-8 h-8 text-yellow-500" />
              对战结果
            </CardTitle>
            <CardDescription className="text-center text-lg">
              双人PK - {getQuestionTypeName(questionType)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 获胜者展示 */}
            {winner !== 0 && (
              <div className="text-center p-6 bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 rounded-xl">
                <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300 mb-2">
                  🎉 恭喜 {winner === 1 ? player1Name : player2Name} 获胜！
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {winner === 1
                    ? `${player1Name}以 ${player1Score} 分击败 ${player2Name} (${player2Score} 分)`
                    : `${player2Name}以 ${player2Score} 分击败 ${player1Name} (${player1Score} 分)`}
                </p>
              </div>
            )}

            {winner === 0 && (
              <div className="text-center p-6 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <p className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                  🤝 平局！
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  两位选手都获得了 {player1Score} 分，实力相当！
                </p>
              </div>
            )}

            {/* 双方得分对比 */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* 玩家1 */}
              <div className={`p-6 rounded-xl border-2 ${winner === 1 ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20' : winner === 0 ? 'border-gray-300 bg-gray-50 dark:bg-gray-800' : 'border-gray-200 bg-blue-50 dark:bg-blue-900/20'}`}>
                <div className="text-center">
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2 flex items-center justify-center gap-2">
                    {winner === 1 && <Crown className="w-6 h-6 text-yellow-500" />}
                    {player1Name}
                  </p>
                  <p className="text-5xl font-bold mb-2">{player1Score}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">总得分 / 100分</p>

                  <div className="mt-4 flex justify-center gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{player1Correct}</p>
                      <p className="text-xs text-gray-500">正确</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-600">{totalCount - player1Correct}</p>
                      <p className="text-xs text-gray-500">错误</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 玩家2 */}
              <div className={`p-6 rounded-xl border-2 ${winner === 2 ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20' : winner === 0 ? 'border-gray-300 bg-gray-50 dark:bg-gray-800' : 'border-gray-200 bg-pink-50 dark:bg-pink-900/20'}`}>
                <div className="text-center">
                  <p className="text-xl font-bold text-pink-600 dark:text-pink-400 mb-2 flex items-center justify-center gap-2">
                    {winner === 2 && <Crown className="w-6 h-6 text-yellow-500" />}
                    {player2Name}
                  </p>
                  <p className="text-5xl font-bold mb-2">{player2Score}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">总得分 / 100分</p>

                  <div className="mt-4 flex justify-center gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{player2Correct}</p>
                      <p className="text-xs text-gray-500">正确</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-600">{totalCount - player2Correct}</p>
                      <p className="text-xs text-gray-500">错误</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 题目详细解析 */}
            <div>
              <Button
                onClick={() => setShowDetailedAnalysis(!showDetailedAnalysis)}
                variant="outline"
                className="w-full mb-4"
              >
                {showDetailedAnalysis ? '收起题目解析' : '查看题目解析'}
              </Button>

              {showDetailedAnalysis && (
                <div className="space-y-6 max-h-96 overflow-y-auto">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">题目详细解析</h3>

                  {/* 玩家1的答题记录 */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                      <Crown className="w-5 h-5" />
                      {player1Name}的答题记录
                    </h4>
                    {player1AnswerRecords.map((record, index) => {
                      const question = record.question;
                      return (
                        <Card key={`p1-${index}`} className="border-2 border-gray-200 dark:border-gray-700">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-sm">
                                {index + 1}
                              </span>
                              {question.question}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {/* 正确答案 */}
                            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                              <p className="text-sm font-semibold text-green-700 dark:text-green-300 mb-1">
                                ✓ 正确答案：{question.options[question.answer]}
                              </p>
                            </div>

                            {/* 玩家1的回答 */}
                            <div className={`p-3 rounded-lg ${record.isCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                              <p className={`text-sm font-semibold mb-1 ${record.isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                                {record.isCorrect ? '✓' : '✗'} {player1Name}回答：{record.userAnswer !== null ? question.options[record.userAnswer] : '未作答'}
                              </p>
                            </div>

                            {/* 解析 */}
                            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                <span className="font-semibold">解析：</span>
                                {question.explanation}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  {/* 玩家2的答题记录 */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-pink-600 dark:text-pink-400 flex items-center gap-2">
                      <Crown className="w-5 h-5" />
                      {player2Name}的答题记录
                    </h4>
                    {player2AnswerRecords.map((record, index) => {
                      const question = record.question;
                      return (
                        <Card key={`p2-${index}`} className="border-2 border-gray-200 dark:border-gray-700">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400 text-sm">
                                {index + 1}
                              </span>
                              {question.question}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {/* 正确答案 */}
                            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                              <p className="text-sm font-semibold text-green-700 dark:text-green-300 mb-1">
                                ✓ 正确答案：{question.options[question.answer]}
                              </p>
                            </div>

                            {/* 玩家2的回答 */}
                            <div className={`p-3 rounded-lg ${record.isCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                              <p className={`text-sm font-semibold mb-1 ${record.isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                                {record.isCorrect ? '✓' : '✗'} {player2Name}回答：{record.userAnswer !== null ? question.options[record.userAnswer] : '未作答'}
                              </p>
                            </div>

                            {/* 解析 */}
                            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                <span className="font-semibold">解析：</span>
                                {question.explanation}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-4">
              <Button onClick={onBack} variant="outline" className="flex-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回主菜单
              </Button>
              <Button onClick={onRestart} className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" />
                再来一次
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// 赛跑动画组件
function RaceTrack({
  position1,
  position2,
  player1Name,
  player2Name,
}: {
  position1: number;
  position2: number;
  player1Name: string;
  player2Name: string;
}) {
  return (
    <Card className="shadow-2xl mb-6 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 dark:from-green-900/30 dark:via-emerald-900/30 dark:to-teal-900/30 border-2 border-green-300 dark:border-green-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl text-center flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
          🏆 赛跑竞技场 🏆
        </CardTitle>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          答对题目可以让你的小动物加速前进！
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* 玩家1跑道 */}
        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full border-2 border-blue-200 dark:border-blue-700">
              <span className="text-4xl animate-bounce">🐰</span>
              <div>
                <span className="font-bold text-lg text-blue-700 dark:text-blue-300">{player1Name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-blue-600 dark:text-blue-400">速度：</span>
                  <div className="w-20 h-2 bg-blue-200 dark:bg-blue-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 dark:bg-blue-400 transition-all duration-300"
                      style={{ width: `${position1}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
              <span className="font-bold text-xl">{position1.toFixed(0)}%</span>
            </div>
          </div>
          <div className="relative">
            {/* 跑道背景 */}
            <div className="h-16 bg-gradient-to-r from-green-200 via-green-100 to-green-200 dark:from-green-900/50 dark:via-green-800/50 dark:to-green-900/50 rounded-2xl border-4 border-green-400 dark:border-green-600 relative overflow-hidden shadow-inner">
              {/* 跑道纹理 */}
              <div className="absolute inset-0 opacity-30">
                <div className="flex items-center h-full">
                  {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90].map((pos, i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 w-full h-full border-r-2 border-green-400 dark:border-green-700"
                      style={{ left: `${pos}%` }}
                    />
                  ))}
                </div>
              </div>
              {/* 起点线 */}
              <div className="absolute left-0 top-0 h-full w-2 bg-green-600 dark:bg-green-500 border-r-4 border-white dark:border-gray-300" />
              {/* 终点线 */}
              <div className="absolute right-0 top-0 h-full w-2 bg-red-500 dark:bg-red-400 border-l-4 border-white dark:border-gray-300" />
              {/* 赛跑标记 */}
              {[0, 25, 50, 75, 100].map((pos, i) => (
                <div key={i} className="absolute top-0 bottom-0 flex flex-col items-center justify-center">
                  <div className="w-0.5 h-6 bg-green-500 dark:bg-green-700 mb-1" />
                  <span className="text-xs text-green-700 dark:text-green-300 font-semibold">{pos}%</span>
                </div>
              ))}
              {/* 小动物 */}
              <div
                className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-out z-10"
                style={{ left: `${Math.max(2, Math.min(position1, 94))}%` }}
              >
                <div className="relative">
                  <div className="absolute -inset-2 bg-blue-400 dark:bg-blue-600 rounded-full opacity-30 animate-ping" />
                  <span className="text-4xl relative z-10 drop-shadow-lg">🐰</span>
                  {/* 速度线 */}
                  <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 flex gap-0.5">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-1 h-0.5 bg-blue-400 dark:bg-blue-300 rounded-full"
                        style={{ opacity: 0.6 - i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 玩家2跑道 */}
        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3 bg-pink-50 dark:bg-pink-900/30 px-4 py-2 rounded-full border-2 border-pink-200 dark:border-pink-700">
              <span className="text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>🐢</span>
              <div>
                <span className="font-bold text-lg text-pink-700 dark:text-pink-300">{player2Name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-pink-600 dark:text-pink-400">速度：</span>
                  <div className="w-20 h-2 bg-pink-200 dark:bg-pink-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-pink-500 dark:bg-pink-400 transition-all duration-300"
                      style={{ width: `${position2}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-pink-500 dark:bg-pink-600 text-white px-4 py-2 rounded-lg shadow-lg">
              <span className="font-bold text-xl">{position2.toFixed(0)}%</span>
            </div>
          </div>
          <div className="relative">
            {/* 跑道背景 */}
            <div className="h-16 bg-gradient-to-r from-green-200 via-green-100 to-green-200 dark:from-green-900/50 dark:via-green-800/50 dark:to-green-900/50 rounded-2xl border-4 border-green-400 dark:border-green-600 relative overflow-hidden shadow-inner">
              {/* 跑道纹理 */}
              <div className="absolute inset-0 opacity-30">
                <div className="flex items-center h-full">
                  {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90].map((pos, i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 w-full h-full border-r-2 border-green-400 dark:border-green-700"
                      style={{ left: `${pos}%` }}
                    />
                  ))}
                </div>
              </div>
              {/* 起点线 */}
              <div className="absolute left-0 top-0 h-full w-2 bg-green-600 dark:bg-green-500 border-r-4 border-white dark:border-gray-300" />
              {/* 终点线 */}
              <div className="absolute right-0 top-0 h-full w-2 bg-red-500 dark:bg-red-400 border-l-4 border-white dark:border-gray-300" />
              {/* 赛跑标记 */}
              {[0, 25, 50, 75, 100].map((pos, i) => (
                <div key={i} className="absolute top-0 bottom-0 flex flex-col items-center justify-center">
                  <div className="w-0.5 h-6 bg-green-500 dark:bg-green-700 mb-1" />
                  <span className="text-xs text-green-700 dark:text-green-300 font-semibold">{pos}%</span>
                </div>
              ))}
              {/* 小动物 */}
              <div
                className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-out z-10"
                style={{ left: `${Math.max(2, Math.min(position2, 94))}%` }}
              >
                <div className="relative">
                  <div className="absolute -inset-2 bg-pink-400 dark:bg-pink-600 rounded-full opacity-30 animate-ping" style={{ animationDelay: '0.5s' }} />
                  <span className="text-4xl relative z-10 drop-shadow-lg">🐢</span>
                  {/* 速度线 */}
                  <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 flex gap-0.5">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-1 h-0.5 bg-pink-400 dark:bg-pink-300 rounded-full"
                        style={{ opacity: 0.6 - i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 领先指示 */}
        {position1 !== position2 && (
          <div className="text-center">
            <span className="text-sm font-semibold bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md">
              {position1 > position2 ? (
                <span className="text-blue-600 dark:text-blue-400">🐰 {player1Name} 暂时领先！</span>
              ) : (
                <span className="text-pink-600 dark:text-pink-400">🐢 {player2Name} 暂时领先！</span>
              )}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function getQuestionTypeName(type: QuestionType): string {
  switch (type) {
    case 'wenyan':
      return '文言文字词';
    case 'idiom':
      return '成语典故';
    case 'poetry':
      return '古诗词';
    default:
      return '';
  }
}

function getResultComment(score: number): string {
  if (score >= 90) return '🎉 太棒了！你是当之无愧的语文学霸！';
  if (score >= 80) return '👏 表现优秀！继续保持，冲击满分！';
  if (score >= 70) return '😊 不错的成绩！还有提升空间，加油！';
  if (score >= 60) return '💪 及格了！多加练习，你会更好！';
  return '📚 还需要继续努力哦！不要灰心，再接再厉！';
}
