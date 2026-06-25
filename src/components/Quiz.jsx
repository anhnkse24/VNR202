import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ArrowRight, RotateCcw, Check, X, HelpCircle, FileText } from 'lucide-react';
import { quizQuestions } from '../data/historyData';

export default function Quiz() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showScoreCard, setShowScoreCard] = useState(false);

  const handleOptionClick = (optionIdx) => {
    if (isAnswered) return; // Prevent clicking multiple times
    
    setSelectedOptionIdx(optionIdx);
    setIsAnswered(true);
    
    if (optionIdx === quizQuestions[currentQuestionIdx].correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextClick = () => {
    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOptionIdx(null);
      setIsAnswered(false);
    } else {
      setShowScoreCard(true);
    }
  };

  const handleRestartClick = () => {
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setIsAnswered(false);
    setScore(0);
    setShowScoreCard(false);
  };

  const getPercentage = () => {
    return Math.round((score / quizQuestions.length) * 100);
  };

  const getScoreMessage = () => {
    const percentage = getPercentage();
    if (percentage === 100) return { title: "Xuất Sắc! Điểm Tuyệt Đối", desc: "Bạn có kiến thức lịch sử vô cùng vững chắc và am hiểu sâu sắc về chặng đường đấu tranh cách mạng (1930 - 1945).", color: "text-emerald-600 bg-emerald-50 border-emerald-200" };
    if (percentage >= 80) return { title: "Giỏi Quá!", desc: "Bạn nắm rất vững các mốc sự kiện chính và chủ trương cốt lõi của Đảng ta.", color: "text-green-600 bg-green-50 border-green-200" };
    if (percentage >= 50) return { title: "Đạt Yêu Cầu", desc: "Bạn đã hiểu bối cảnh cơ bản, hãy ôn tập lại thêm một chút để ghi nhớ kỹ hơn các mốc thời gian nhé.", color: "text-amber-600 bg-amber-50 border-amber-200" };
    return { title: "Cố Gắng Lên Nhé!", desc: "Đừng nản lòng, lịch sử là một hành trình dài. Hãy đọc lại các phần chi tiết của từng giai đoạn và thử sức lại.", color: "text-museum-red bg-red-50 border-red-200" };
  };

  const currentQuestion = quizQuestions[currentQuestionIdx];
  const progressPercent = ((currentQuestionIdx + 1) / quizQuestions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-left">
      <div className="text-center mb-10">
        <span className="text-xs font-bold text-museum-red bg-museum-red/10 px-3 py-1.5 rounded-full uppercase tracking-wider">
          Kiểm tra Kiến thức
        </span>
        <h2 className="font-serif text-3xl font-bold text-museum-charcoal mt-3">
          Trắc Nghiệm Ôn Tập Lịch Sử
        </h2>
        <p className="text-xs sm:text-sm text-museum-charcoal/70 mt-1 max-w-lg mx-auto">
          Củng cố lại kiến thức về chặng đường 1930 - 1945 thông qua bộ câu hỏi trắc nghiệm khách quan nhanh.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!showScoreCard ? (
          <motion.div
            key="quiz-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl border-2 border-museum-red/15 shadow-museum overflow-hidden"
          >
            {/* Progress Bar */}
            <div className="h-1.5 bg-museum-creamDark">
              <div 
                className="h-full bg-museum-red transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="p-6 sm:p-8">
              {/* Question Header */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-museum-gold uppercase flex items-center gap-1.5">
                  <HelpCircle size={16} />
                  Câu hỏi {currentQuestionIdx + 1} / {quizQuestions.length}
                </span>
                <span className="text-xs font-semibold text-museum-charcoal bg-museum-creamDark px-2.5 py-1 rounded-full">
                  Đúng: {score}
                </span>
              </div>

              {/* Question Text */}
              <h3 className="font-serif text-base sm:text-lg font-bold text-museum-charcoal leading-relaxed mb-6">
                {currentQuestion.question}
              </h3>

              {/* Options list */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => {
                  let btnStyle = "border-museum-red/10 hover:border-museum-red/30 hover:bg-museum-cream/30 bg-white text-museum-charcoal";
                  
                  if (isAnswered) {
                    if (idx === currentQuestion.correctIndex) {
                      // Correct option is always green
                      btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-500/20";
                    } else if (idx === selectedOptionIdx) {
                      // Selected wrong option is red
                      btnStyle = "bg-red-50 border-museum-red text-red-950 ring-1 ring-museum-red/20";
                    } else {
                      // Unselected options are muted
                      btnStyle = "opacity-50 border-gray-200 bg-white text-museum-charcoal/60";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(idx)}
                      disabled={isAnswered}
                      className={`w-full text-left p-4 rounded-xl border text-sm transition-all duration-200 flex justify-between items-center gap-3 ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {isAnswered && idx === currentQuestion.correctIndex && (
                        <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                          <Check size={12} />
                        </span>
                      )}
                      {isAnswered && idx === selectedOptionIdx && idx !== currentQuestion.correctIndex && (
                        <span className="w-5 h-5 rounded-full bg-museum-red text-white flex items-center justify-center shrink-0">
                          <X size={12} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Answer Explanation */}
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-6 p-5 bg-museum-creamDark/50 border border-museum-red/10 rounded-xl text-xs sm:text-sm text-museum-charcoal/80 leading-relaxed flex gap-2"
                >
                  <FileText className="text-museum-gold shrink-0 mt-0.5" size={18} />
                  <div>
                    <strong className="text-museum-red font-serif block mb-1">
                      Giải thích lịch sử:
                    </strong>
                    {currentQuestion.explanation}
                  </div>
                </motion.div>
              )}

              {/* Next Button */}
              {isAnswered && (
                <div className="flex justify-end mt-8">
                  <button
                    onClick={handleNextClick}
                    className="flex items-center gap-1 px-6 py-2.5 rounded-lg bg-museum-red text-white font-semibold hover:bg-museum-redLight transition-all duration-200 shadow-sm"
                  >
                    <span>
                      {currentQuestionIdx === quizQuestions.length - 1 ? 'Xem kết quả' : 'Câu tiếp theo'}
                    </span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}

            </div>
          </motion.div>
        ) : (
          /* SCORE CARD VIEW */
          <motion.div
            key="score-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-white rounded-2xl border-2 border-museum-gold/30 shadow-2xl p-8 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-museum-gold/10 text-museum-gold flex items-center justify-center mx-auto mb-6">
              <Award size={44} />
            </div>

            <h3 className="font-serif text-2xl font-bold text-museum-charcoal">
              Kết Quả Trắc Nghiệm
            </h3>
            
            <div className="my-6">
              <span className="text-5xl font-extrabold text-museum-red">
                {score}
              </span>
              <span className="text-2xl text-museum-charcoal/50 font-bold">
                /{quizQuestions.length}
              </span>
              <p className="text-sm font-semibold text-museum-gold mt-1 uppercase tracking-wider">
                Đạt tỷ lệ {getPercentage()}%
              </p>
            </div>

            {/* Score Custom Message Card */}
            <div className={`p-5 rounded-xl border mb-8 text-left ${getScoreMessage().color}`}>
              <h4 className="font-serif text-lg font-bold">
                {getScoreMessage().title}
              </h4>
              <p className="text-xs sm:text-sm mt-1.5 leading-relaxed opacity-90">
                {getScoreMessage().desc}
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-4">
              <button
                onClick={handleRestartClick}
                className="flex items-center gap-1.5 px-6 py-3 rounded-lg border border-museum-red/20 text-museum-red font-semibold hover:bg-museum-cream transition-colors duration-200"
              >
                <RotateCcw size={16} />
                Làm lại trắc nghiệm
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
