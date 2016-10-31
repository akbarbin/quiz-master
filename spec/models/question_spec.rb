require 'spec_helper'

describe Question, :type => :model do
  subject { described_class.new(content: "What is one?", answer: 1) }

  describe "Validations" do
    it "is valid with valid attributes" do
      expect(subject).to be_valid
    end

    it "is not valid without a content" do
      subject.content = nil
      expect(subject).to_not be_valid
    end

    it "is not valid without a answer" do
      subject.answer = nil
      expect(subject).to_not be_valid
    end
  end

  describe ".validate_answer" do
    it "is valid answer with integer value" do
      result = subject.validate_answer({ answer: "1" })
      expect(result).to eq(true)
    end

    it "is valid answer with word value" do
      result = subject.validate_answer({ answer: "one" })
      expect(result).to eq(true)
    end

    it "is not valid answer" do
      result = subject.validate_answer({ answer: "2" })
      expect(result).to eq(false)
    end
  end

  describe ".in_words(int)" do
    it "is valid words result" do
      result = subject.in_words(1)
      expect(result).to eq("one")
    end

    it "is valid words result" do
      result = subject.in_words(1)
      expect(result).to_not eq("two")
    end

  end
end
