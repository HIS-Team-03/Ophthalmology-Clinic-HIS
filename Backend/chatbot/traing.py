import random
import numpy as np
import json
import pickle
import nltk

nltk.download('wordnet')
# nltk.download('punkt')
from nltk.stem import WordNetLemmatizer
import tensorflow as tf
print(tf.__version__)
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Activation, Dropout,Input
from tensorflow.keras.optimizers import SGD
from tensorflow.keras.optimizers.schedules import ExponentialDecay

lemmatizer = WordNetLemmatizer()
intent = json.loads(open('intent.json').read())

words = []
classes = []
documents = []
ignore = ['?', '!', '.', ',']
for intent in intent['intents']:
    for pattern in intent['patterns']:
        word_list = nltk.word_tokenize(pattern) # tokenize each word in a list ["",""]
        words.extend(word_list)
        documents.append((word_list, intent['tag']))
        if intent['tag'] not in classes:
            classes.append(intent['tag'])
print(documents)
words = [lemmatizer.lemmatize(w.lower()) for w in words if w not in ignore]
words = sorted(list(set(words)))
classes = sorted(list(set(classes)))
print(words)
print(classes)
pickle.dump(words, open('words.pkl', 'wb'))
pickle.dump(classes, open('classes.pkl', 'wb'))
training = []
output_empty = [0] * len(classes)
for doc in documents:
    bag = []
    word_patterns = doc[0]
    print(word_patterns)
    word_patterns = [lemmatizer.lemmatize(word.lower()) for word in word_patterns]
    for word in words:
        bag.append(1) if word in word_patterns else bag.append(0)
    output_row = list(output_empty)
    output_row[classes.index(doc[1])] = 1
    training.append([bag, output_row])
print(bag)
print(output_row)
random.shuffle(training)
print(training)
# Convert to numpy arrays in a safe way
train_x = np.array([item[0] for item in training])  # Ensuring all features have the same length
train_y = np.array([item[1] for item in training])  # Ensuring all labels have the same length

print(train_x.shape, train_y.shape)
model = Sequential([
    Input(shape=(len(train_x[0]),)),  # Using Input layer to specify input shape
    Dense(128, activation='relu'),
    Dropout(0.5),
    Dense(64, activation='relu'),
    Dropout(0.5),
    Dense(len(train_y[0]), activation='softmax')
])

# Setting up the learning rate schedule
initial_learning_rate = 0.01
lr_schedule = ExponentialDecay(
    initial_learning_rate,
    decay_steps=100000,
    decay_rate=0.96,
    staircase=True)

# Configure the optimizer
sgd = SGD(learning_rate=lr_schedule, momentum=0.9, nesterov=True)

# Compile the model
model.compile(optimizer=sgd, loss='categorical_crossentropy', metrics=['accuracy'])

# Fit the model
model.fit(np.array(train_x), np.array(train_y), epochs=200, batch_size=5, verbose=1)

# Save the model
model.save('chatbot_model.h5')
print('Done')