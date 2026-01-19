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

// 玩家状态接口
interface PlayerState {
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  isAnswered: boolean;
  score: number;
  showExplanation: boolean;
}

export default function Game({ gameMode, questionType, onBack }: GameProps) {
  const [questions] = useState(() => shuffleArray(getQuestionsByType(questionType, 10)));
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
  });

  // 双人模式状态 - 玩家1和玩家2
  const [player1State, setPlayer1State] = useState<PlayerState>({
    currentQuestionIndex: 0,
    selectedAnswer: null,
    isAnswered: false,
    score: 0,
    showExplanation: false,
  });

  const [player2State, setPlayer2State] = useState<PlayerState>({
    currentQuestionIndex: 0,
    selectedAnswer: null,
    isAnswered: false,
    score: 0,
    showExplanation: false,
  });

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

  // 单人模式处理函数
  const handleSingleAnswer = (answerIndex: number) => {
    if (playerState.isAnswered) return;
    
    const currentQuestion = questions[playerState.currentQuestionIndex];
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
    if (playerState.currentQuestionIndex < questions.length - 1) {
      setPlayerState({
        currentQuestionIndex: playerState.currentQuestionIndex + 1,
        selectedAnswer: null,
        isAnswered: false,
        score: playerState.score,
        showExplanation: false,
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
    
    if (state.isAnswered) return;
    
    const currentQuestion = questions[state.currentQuestionIndex];
    const newScore = answerIndex === currentQuestion.answer ? state.score + 1 : state.score;
    
    setState({
      ...state,
      selectedAnswer: answerIndex,
      isAnswered: true,
      showExplanation: true,
      score: newScore,
    });
  };

  const handleMultiNext = (player: 1 | 2) => {
    const state = player === 1 ? player1State : player2State;
    const setState = player === 1 ? setPlayer1State : setPlayer2State;
    
    if (state.currentQuestionIndex < questions.length - 1) {
      setState({
        currentQuestionIndex: state.currentQuestionIndex + 1,
        selectedAnswer: null,
        isAnswered: false,
        score: state.score,
        showExplanation: false,
      });
    } else {
      setState({
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      });
      
      // 检查是否两个玩家都完成了
      const otherState = player === 1 ? player2State : player1State;
      if (otherState.currentQuestionIndex >= questions.length - 1) {
        setGameEnded(true);
        setShowResult(true);
      }
    }
  };

  const handleRestart = () => {
    setPlayerState({
      currentQuestionIndex: 0,
      selectedAnswer: null,
      isAnswered: false,
      score: 0,
      showExplanation: false,
    });
    
    setPlayer1State({
      currentQuestionIndex: 0,
      selectedAnswer: null,
      isAnswered: false,
      score: 0,
      showExplanation: false,
    });
    
    setPlayer2State({
      currentQuestionIndex: 0,
      selectedAnswer: null,
      isAnswered: false,
      score: 0,
      showExplanation: false,
    });
    
    setGameEnded(false);
    setTimeLeft(gameMode === 'multi' ? 180 : 0);
    setShowResult(false);
  };

  // 结果界面
  if (showResult) {
    if (gameMode === 'single') {
      const totalScore = Math.round((playerState.score / questions.length) * 100);
      return (
        <ResultSingle
          totalScore={totalScore}
          correctCount={playerState.score}
          totalCount={questions.length}
          questionType={questionType}
          onRestart={handleRestart}
          onBack={onBack}
        />
      );
    } else {
      const player1Score = Math.round((player1State.score / questions.length) * 100);
      const player2Score = Math.round((player2State.score / questions.length) * 100);
      return (
        <ResultMulti
          player1Score={player1Score}
          player2Score={player2Score}
          player1Correct={player1State.score}
          player2Correct={player2State.score}
          totalCount={questions.length}
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

        {/* 双人答题区域 */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {/* 玩家1区域 */}
          <PlayerArea
            playerName="玩家 1"
            playerColor="blue"
            questions={questions}
            playerState={player1State}
            onAnswer={(answer) => handleMultiAnswer(1, answer)}
            onNext={() => handleMultiNext(1)}
            questionType={questionType}
          />

          {/* VS分隔符 */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white font-bold text-3xl px-6 py-3 rounded-full shadow-2xl">
              VS
            </div>
          </div>

          {/* 玩家2区域 */}
          <PlayerArea
            playerName="玩家 2"
            playerColor="pink"
            questions={questions}
            playerState={player2State}
            onAnswer={(answer) => handleMultiAnswer(2, answer)}
            onNext={() => handleMultiNext(2)}
            questionType={questionType}
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
              {Math.round((playerState.score / questions.length) * 100)}分
            </span>
          </div>
        </div>

        <PlayerArea
          playerName="单人模式"
          playerColor="blue"
          questions={questions}
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
}: {
  playerName: string;
  playerColor: 'blue' | 'pink';
  questions: Question[];
  playerState: PlayerState;
  onAnswer: (answerIndex: number) => void;
  onNext: () => void;
  questionType: QuestionType;
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
          {playerState.showExplanation && (
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">解析：</span>
                {currentQuestion?.explanation}
              </p>
            </div>
          )}

          {/* 下一题按钮 */}
          {playerState.isAnswered && (
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
  totalCount,
  questionType,
  onRestart,
  onBack,
}: {
  player1Score: number;
  player2Score: number;
  player1Correct: number;
  player2Correct: number;
  totalCount: number;
  questionType: QuestionType;
  onRestart: () => void;
  onBack: () => void;
}) {
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
                  🎉 恭喜 玩家 {winner} 获胜！
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {winner === 1
                    ? `玩家1以 ${player1Score} 分击败 玩家2 (${player2Score} 分)`
                    : `玩家2以 ${player2Score} 分击败 玩家1 (${player1Score} 分)`}
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
                    玩家 1
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
                    玩家 2
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
