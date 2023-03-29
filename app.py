import numpy as np
from flask import Flask, request, jsonify, render_template
from flask_pymongo import PyMongo
import pickle
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = "mongodb+srv://ShahKandarp:shahkandarp2430@cluster0.bfs094s.mongodb.net/SQAACP?retryWrites=true&w=majority"
mongodb_client = PyMongo(app)
db = mongodb_client.db
model = pickle.load(open('crop_model.pkl', 'rb'))


@app.route('/',methods=['GET'])
def send():
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    '''
    For rendering results on HTML GUI
    '''
    int_features = []
    json = request.get_json()
    for i in json:
        print(json[i])
    int_features.append(float(json['N']))
    int_features.append(float(json['P']))
    int_features.append(float(json['K']))
    int_features.append(float(json['temperature']))
    int_features.append(float(json['humidity']))
    int_features.append(float(json['ph']))
    int_features.append(float(json['rainfall']))
    int_features[0] = (int_features[0] - 0)/(140-0)
    int_features[1] = (int_features[1] - 5)/(95-5)
    int_features[2] = (int_features[2] - 5)/(85-5)
    int_features[3] = (int_features[3] - 10.01081312)/(43.67549305-10.01081312)
    int_features[4] = (int_features[4] - 14.25803981)/(99.98187601-14.25803981)
    int_features[5] = (int_features[5] - 3.504752314)/(9.93509073-3.504752314)
    int_features[6] = (int_features[6] - 20.21126747)/(298.5601175-20.21126747)

    final_features = [np.array(int_features)]
    # prediction = model.predict(final_features)
    probs = model.predict_proba(final_features)
    prediction = np.argsort(-probs, axis=1)[:, :3]
    print(prediction)
    output = prediction[0]
    f_output = []
    dict_crop_name = {
        0: "Banana", 1: "Blackgram", 2: "Chikpea", 3: "Coconut", 4: "Coffee", 5: "Cotton",
        6: "Jute", 7: "Kidney Beans", 8: "Lentil", 9: "Maize", 10: " Mango", 11: "Moth Beans", 12: "Mung Beans", 13: "Musk Melons",
        14: "Orange", 15: "Papaya", 16: "Pigeon Peas", 17: "Pomegranate", 18: "Rice", 19: "Watermelon"}
    stri = "Crops which can be grown are "
    j=0
    for i in output:
        stri+= dict_crop_name[i]
        j = j+1
        if j==3:
            stri+='.'
        else:
            stri+=','
    # payload = {'api_key': 'JOG2BMDFMWP2E2IH', 'field2': stri}
    print(stri)
    # r = requests.post('https://api.thingspeak.com/update?api_key=JOG2BMDFMWP2E2IH&field2='+stri)
    # print(r.text)
    db.answer.insert_one({'ans':stri})
    obj = {
        "res":"Success"
    }
    return jsonify(obj)

    # print(stri)
    # obj = {
    #     "res": "Success",
    #     "output": stri
    # }
    # return jsonify(obj)


@app.route('/abc', methods=['POST'])
def abc():
    print('Hello')
    json = request.get_json()
    print(json)
    data = {
        "res": "Success"
    }
    return jsonify(data)

@app.route('/answer', methods=['GET'])
def abdcdefsa():
    ans = db.answer.find({}).sort('_id',-1).limit(1)
    data = {
        "res": "Success",
        "data":ans[0]['ans']
    }
    return jsonify(data)



if __name__ == "__main__":
    app.run(debug=True)
