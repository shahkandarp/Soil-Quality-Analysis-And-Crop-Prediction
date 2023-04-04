import numpy as np
from flask import Flask, request, jsonify, render_template
from flask_pymongo import PyMongo
import pickle
from flask_cors import CORS
from datetime import datetime
from pytz import timezone

app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = "mongodb+srv://ShahKandarp:shahkandarp2430@cluster0.bfs094s.mongodb.net/Soil-Crop-Prediction?retryWrites=true&w=majority"
mongodb_client = PyMongo(app)
db = mongodb_client.db
model = pickle.load(open('crop_model_changed.pkl', 'rb'))

app.config['SECRET_KEY'] = 'a7ba1e2d324c1a4d4082ee9b30c2fe812306e9e8df29740c1cac765d033df351'

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
    int_features.append(float(json['N']))
    int_features.append(float(json['P']))
    int_features.append(float(json['K']))
    int_features.append(float(json['temperature']))
    int_features.append(float(json['humidity']))
    int_features.append(float(json['ph']))
    int_features[0] = (int_features[0] - 0)/(140-0)
    int_features[1] = (int_features[1] - 5)/(95-5)
    int_features[2] = (int_features[2] - 5)/(85-5)
    int_features[3] = (int_features[3] - 10.01081312)/(43.67549305-10.01081312)
    int_features[4] = (int_features[4] - 14.25803981)/(99.98187601-14.25803981)
    int_features[5] = (int_features[5] - 3.504752314)/(9.93509073-3.504752314)

    final_features = [np.array(int_features)]
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
    now = datetime.now(timezone('Asia/Kolkata'))
    db.datas.insert_one({'N':json['N'],'P':json['P'],'K':json['K'],'temprature':json['temperature'],'humidity':json['humidity'],'productId':json['productId'],'pH':json['ph'],'output':stri,'lat':json['lat'],'lng':json['lng'],'time':now})
    obj = {
        "res":"Success"
    }
    return jsonify(obj)




if __name__ == "__main__":
    app.run(debug=True)
