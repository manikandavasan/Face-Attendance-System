import face_recognition
import numpy as np
import cv2

def get_face_encoding(image):
    # Convert BGR → RGB
    rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # Step 1: detect face locations
    face_locations = face_recognition.face_locations(rgb)

    if len(face_locations) == 0:
        return None

    # Step 2: get encodings using locations
    encodings = face_recognition.face_encodings(rgb, face_locations)

    if len(encodings) == 0:
        return None

    return encodings[0]