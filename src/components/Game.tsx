'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getQuestionsByType, Question, QuestionType } from '@/lib/questions';
import { ArrowLeft, CheckCircle, XCircle, Clock, Trophy, RotateCcw } from 'lucide-react';

interface GameProps {
  gameMode: 'single' | 'multi';
  questionType: QuestionType;
  onBack: () => void;
}

export default function Game({ gameMode, questionType, onBack }: GameProps) {
  const [questions] = useState(() => shuffleArray(getQuestionsByType(questionType, 10)));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(gameMode === 'multi' ? 180 : 0); // 双人模式3分钟
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + (isAnswered ? 1 : 0)) / questions.length) * 100;
  const totalScore = Math.round((score / questions.length) * 100);

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

  // 随机打乱数组
  function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  // 选择答案
  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return;
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    setShowExplanation(true);

    // 计算分数
    if (answerIndex === currentQuestion.answer) {
      setScore(score + 1);
    }
  };

  // 下一题
  const handleNext = () => {
    setShowExplanation(false);
    setSelectedAnswer(null);
    setIsAnswered(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setGameEnded(true);
      setShowResult(true);
    }
  };

  // 重新开始
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowExplanation(false);
    setGameEnded(false);
    setTimeLeft(gameMode === 'multi' ? 180 : 0);
    setShowResult(false);
  };

  // 返回主菜单
  const handleBackToMenu = () => {
    onBack();
  };

  // 游戏结果界面
  if (showResult) {
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
                {gameMode === 'single' ? '单人模式' : '双人PK模式'} - {getQuestionTypeName()}
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
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{score}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">正确</p>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {questions.length - score}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">错误</p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {questions.length}
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
                <Button
                  onClick={handleBackToMenu}
                  variant="outline"
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回主菜单
                </Button>
                <Button onClick={handleRestart} className="flex-1">
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

  // 游戏进行中界面
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        {/* 顶部信息栏 */}
        <div className="flex items-center justify-between mb-6">
          <Button onClick={handleBackToMenu} variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回
          </Button>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                {Math.round((score / questions.length) * 100)}分
              </span>
            </div>

            {gameMode === 'multi' && (
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md">
                <Clock className="w-5 h-5 text-red-500" />
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 进度条 */}
        <div className="mb-6">
          <Progress value={progress} className="h-3" />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
            题目 {currentQuestionIndex + 1} / {questions.length}
          </p>
        </div>

        {/* 题目卡片 */}
        <Card className="shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">{getQuestionTypeName()}</CardTitle>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm">
                第 {currentQuestionIndex + 1} 题
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 题目 */}
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <p className="text-lg leading-relaxed text-gray-800 dark:text-white">
                {currentQuestion.question}
              </p>
            </div>

            {/* 选项 */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.answer;
                const isWrong = isSelected && !isCorrect;

                let buttonStyle = 'hover:bg-gray-50 dark:hover:bg-gray-800';
                if (isAnswered) {
                  if (isCorrect) {
                    buttonStyle = 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-300';
                  } else if (isWrong) {
                    buttonStyle = 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-300';
                  } else {
                    buttonStyle = 'opacity-50';
                  }
                } else if (isSelected) {
                  buttonStyle = 'bg-blue-100 dark:bg-blue-900/30 border-blue-500';
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={isAnswered}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${buttonStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-gray-800 dark:text-white">{option}</span>
                      {isAnswered && isCorrect && (
                        <CheckCircle className="w-6 h-6 text-green-500 ml-auto" />
                      )}
                      {isAnswered && isWrong && (
                        <XCircle className="w-6 h-6 text-red-500 ml-auto" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 解析 */}
            {showExplanation && (
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">解析：</span>
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* 下一题按钮 */}
            {isAnswered && (
              <Button onClick={handleNext} className="w-full" size="lg">
                {currentQuestionIndex < questions.length - 1 ? '下一题' : '查看结果'}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function getQuestionTypeName(type?: QuestionType): string {
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
