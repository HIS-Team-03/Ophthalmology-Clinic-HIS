import random
import numpy as np
import pickle
import json
from flask import Flask, request, jsonify
import tensorflow as tf
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
from flask_cors import CORS
import requests
app = Flask(__name__)
CORS(app)
# Load all required files for the chatbot
lemmatizer = WordNetLemmatizer()
model = tf.keras.models.load_model('chatbot_model.h5')
with open('words.pkl', 'rb') as file:
    words = pickle.load(file)
with open('classes.pkl', 'rb') as file:
    classes = pickle.load(file)
with open('intent.json') as file:
    intents = json.load(file)
print(intents)
def clean_up_sentence(sentence):
    sentence_words = word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words

def bag_of_words(sentence):
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * len(words)
    for s in sentence_words:
        for i, w in enumerate(words):
            if w == s:
                bag[i] = 1
    return np.array(bag)

def predict_class(sentence):
    bow = bag_of_words(sentence)
    res = model.predict(np.array([bow]))[0]
    ERROR_THRESHOLD = 0.7
    print(res)
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({'intent': classes[r[0]], 'probability': str(r[1])})
    return return_list

@app.route('/getresponse', methods=['POST'])
def get_response():
    sentence = request.json['message']
    intents_list = predict_class(sentence)
    tag = intents_list[0]['intent'] if intents_list else 'noanswer'
    list_of_intents = intents['intents']
    result = "I don't understand your query."  # Default response if no intents match

    for i in list_of_intents:
        if i['tag'] == tag:
            if tag == 'health_advice':
                result = get_external_api_response(sentence)
            else:
                result = random.choice(i['responses'])
            break
        # else:
        # # # If no tag matches, or if the tag is 'noanswer', use ChatGPT to generate a response
        # #     result = get_chatgpt_response(sentence)

    return jsonify({'response': result})

if __name__ == '__main__':
    app.run(debug=True, port=5002)
