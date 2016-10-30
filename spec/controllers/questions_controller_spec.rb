require "spec_helper"

describe QuestionsController, :type => :controller do
  render_views
  describe "GET #index" do
    before do
      Question.create!(content: 'How many vowels are there in the English alphabet?', answer: "5")
      Question.create!(content: 'Who is President of America?', answer: "Obama")

      xhr :get, :index, format: :json
    end

    subject(:results) { JSON.parse(response.body) }

    def extract_content
      ->(object) { object["answer"] }
    end

    it "responds successfully with an HTTP 200 status code" do
      expect(response.status).to eq(200)
    end

    it 'should return two results' do
      expect(results.size).to eq(2)
    end

    it "should include '5' as answer" do
      expect(results.map(&extract_content)).to include('5')
    end

    it "should include 'Obama'" do
      expect(results.map(&extract_content)).to include('Obama')
    end
  end

  describe "show" do
    before do
      xhr :get, :show, format: :json, id: question_id
    end

    subject(:results) { JSON.parse(response.body) }

    context "when the question exists" do
      let(:question) {
        Question.create!(content: 'What is the latest version of Rails?',
               answer: "5")
      }
      let(:question_id) { question.id }

      it { expect(response.status).to eq(200) }
      it { expect(results["id"]).to eq(question.id) }
      it { expect(results["content"]).to eq(question.content) }
      it { expect(results["answer"]).to eq(question.answer) }
    end

  end

  describe "create" do
    before do
      xhr :post, :create, format: :json, question: { content: "what is integer of five?",
                                           answer: "5" }
    end
    it { expect(response.status).to eq(201) }
    it { expect(Question.last.content).to eq("what is integer of five?") }
    it { expect(Question.last.answer).to eq("5") }
  end

  describe "update" do
    let(:question) {
      Question.create!(content: 'what is integer of six?',
                     answer: "6")
    }
    before do
      xhr :put, :update, format: :json, id: question.id, question: { content: "what is integer of six?",
                                                 answer: "6" }
      question.reload
    end
    it { expect(response.status).to eq(200) }
    it { expect(question.content).to eq("what is integer of six?") }
    it { expect(question.answer).to eq("6") }
  end

  describe "destroy" do
    let(:question_id) {
      Question.create!(content: 'what is integer of five?',
                     answer: "5").id
    }
    before do
      xhr :delete, :destroy, format: :json, id: question_id
    end
    it { expect(response.status).to eq(204) }
    it { expect(Question.find_by_id(question_id)).to be_nil }
  end
end
