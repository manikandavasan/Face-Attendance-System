from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .utils import *
import numpy as np
import cv2
from rest_framework.views import *
from .models import User
from django.shortcuts import get_list_or_404
from datetime import date
from .serializer import *

import face_recognition

import face_recognition

class RegisterUser(APIView):
    def post(self, request):
        image = request.FILES['image']

        file_bytes = np.asarray(bytearray(image.read()), dtype=np.uint8)
        frame = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        encoding = get_face_encoding(frame)

        if encoding is None:
            return Response({"msg": "Face not detected properly"}, status=400)

        # 🔥 CHECK DUPLICATE FACE
        users = User.objects.all()

        for user in users:
            stored_encoding = np.frombuffer(user.face_encoding, dtype=np.float64)

            match = face_recognition.compare_faces(
                [stored_encoding], encoding
            )[0]

            if match:
                return Response({
                    "msg": f"Face already registered with email: {user.email}"
                }, status=400)

        # ✅ CREATE NEW USER
        User.objects.create(
            name=request.data['name'],
            email=request.data['email'],
            face_encoding=encoding.tobytes()
        )

        return Response({"msg": "User registered"})
    

class SignInUser(APIView):
    def post(self, request):
        image = request.FILES['image']
        email = request.data.get('email')

        file_bytes = np.asarray(bytearray(image.read()), dtype=np.uint8)
        frame = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        encoding = get_face_encoding(frame)

        if encoding is None:
            return Response({"msg": "Face not detected"}, status=400)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"msg": "User not found"}, status=404)

        stored_encoding = np.frombuffer(user.face_encoding, dtype=np.float64)

        # 🔥 FACE MATCH
        distance = face_recognition.face_distance(
            [stored_encoding], encoding
        )[0]

        if distance < 0.5:

            # ✅ CHECK TODAY ATTENDANCE
            today = date.today()

            already_marked = Attendance.objects.filter(
                user=user,
                date=today
            ).exists()

            if already_marked:
                return Response({
                    "msg": "Attendance already marked today"
                })

            # ✅ CREATE ATTENDANCE
            Attendance.objects.create(user=user)

            return Response({
                "msg": "Attendance marked successfully",
                "user": user.name
            })

        return Response({"msg": "Face not match"}, status=400)
    

class AttendanceData(APIView):
    def get(self, request):
        attendance_data = Attendance.objects.select_related('user').all()
        serializer = AttendanceSerializer(attendance_data, many=True)
        return Response(serializer.data)