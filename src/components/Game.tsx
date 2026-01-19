'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getQuestionsByType, Question, QuestionType, shuffleArray } from '@/lib/questions';
import { ArrowLeft, CheckCircle, XCircle, Clock, Trophy, RotateCcw, Crown } from 'lucide-react';

interface GameProps {
  gameMode: 'single' | 'multi';
  questionType: QuestionType;
  onBack: () => void;
}

// 答题记录接口
interface AnswerRecord {
  question: Question;
  userAnswer: number | null;
  isCorrect: boolean;
}

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
  const [timeLeft, setTimeLeft] = useState(gameMode === 'multi' ? 180 : 0); // 双人模式3分钟
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

  // 倒计时（仅双人模式）
  useEffect(() => {
    if (gameMode === 'multi' && timeLeft > 0 && !gameEnded) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameEnded(true);
            setShowResult(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameMode, timeLeft, gameEnded]);

  // 赛跑动画（仅双人模式）
  useEffect(() => {
    if (gameMode === 'multi' && !gameEnded) {
      const animationFrame = setInterval(() => {
        setRacePosition1((prev) => Math.min(prev + 0.15, 100)); // 自动前进
        setRacePosition2((prev) => Math.min(prev + 0.15, 100)); // 自动前进
      }, 100); // 每100ms更新一次
      return () => clearInterval(animationFrame);
    }
  }, [gameMode, gameEnded]);

  // 单人模式处理函数
  const handleSingleAnswer = (answerIndex: number) => {
    if (playerState.isAnswered) return;
    
    const currentQuestion = questionsData.questions[playerState.currentQuestionIndex];
    const newScore = answerIndex === currentQuestion.answer ? playerState.score + 1 : playerState.score;
    
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
    setTimeLeft(gameMode === 'multi' ? 180 : 0);
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
        />
      );
    }
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
            player1Name="聪聪"
            player2Name="明明"
          />
        </div>

        {/* 双人答题区域 */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {/* 玩家1区域 */}
          <PlayerArea
            playerName="聪聪"
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
            playerName="明明"
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
                  🎉 恭喜 {winner === 1 ? '聪聪' : '明明'} 获胜！
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {winner === 1
                    ? `聪聪以 ${player1Score} 分击败 明明 (${player2Score} 分)`
                    : `明明以 ${player2Score} 分击败 聪聪 (${player1Score} 分)`}
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
                    聪聪
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
                    明明
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
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">题目详细解析</h3>
                  
                  {player1AnswerRecords.map((record, index) => {
                    const player2Record = player2AnswerRecords[index];
                    const question = record.question;
                    
                    return (
                      <Card key={index} className="border-2 border-gray-200 dark:border-gray-700">
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
                              {record.isCorrect ? '✓' : '✗'} 聪聪回答：{record.userAnswer !== null ? question.options[record.userAnswer] : '未作答'}
                            </p>
                          </div>

                          {/* 玩家2的回答 */}
                          <div className={`p-3 rounded-lg ${player2Record.isCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                            <p className={`text-sm font-semibold mb-1 ${player2Record.isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                              {player2Record.isCorrect ? '✓' : '✗'} 明明回答：{player2Record.userAnswer !== null ? question.options[player2Record.userAnswer] : '未作答'}
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
