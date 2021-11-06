import tensorflow as tf
import cv2 
import matplotlib.pyplot as plt

model = tf.keras.models.load_model("CatsVsDogs-CNN.model")

def prepare(filepath):
    img_size = 100;
    img_array = cv2.imread(filepath)
    new_array = cv2.resize(img_array, (img_size, img_size));
    return new_array.reshape(-1, img_size, img_size, 3);

prediction = model.predict([prepare('IMG-0648.jpg')]);

print(prediction)


img = cv2.imread('IMG-0648.jpg')
plt.imshow(img)
plt.show()