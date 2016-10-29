class ExamsController < ApplicationController

  # GET /exams
  # GET /exams.json
  def check_answer
    question = Question.find(params[:exam][:question_id])
    result = question.validate_answer(params[:exam])

    respond_to do |format|
      format.json {render json: {result: result}}
    end
  end

end
