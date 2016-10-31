require "spec_helper"

describe ExamsController, type: :controller do
  render_views

  describe "check answer" do
    before do
      xhr :post, :check_answer, format: :json, exam: { answer: answer, question_id: question.id }
    end

    subject(:results) { JSON.parse(response.body) }

    context "When answer is correct" do
      let(:question) {
        Question.create!(content: "What is integer one?", answer: 1)
      }

      let(:answer) { "1" }

      it { expect(results["result"]).to eq(true) }
    end

    context "When answer is correct integer to words" do
      let(:question) {
        Question.create!(content: "What is integer one?", answer: 1)
      }

      let(:answer) { "one" }

      it { expect(results["result"]).to eq(true) }
    end

    context "When answer is incorrect integer to words" do
      let(:question) {
        Question.create!(content: "What is integer one?", answer: 1)
      }

      let(:answer) { "two" }

      it { expect(results["result"]).to eq(false) }
    end

    context "When answer is incorrect" do
      let(:question) {
        Question.create!(content: "What is integer one?", answer: 1)
      }

      let(:answer) { "5" }

      it { expect(results["result"]).to eq(false) }
    end

  end
end
