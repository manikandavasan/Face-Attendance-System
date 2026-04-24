from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
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
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        try:
            name = request.data.get('name')
            email = request.data.get('email')
            image = request.FILES.get('image')

            if not name or not email:
                return Response({"msg": "Name and email required"}, status=400)

            if not image:
                return Response({"msg": "Image not received"}, status=400)

            file_bytes = np.asarray(bytearray(image.read()), dtype=np.uint8)
            frame = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

            if frame is None:
                return Response({"msg": "Invalid image"}, status=400)

            encoding = get_face_encoding(frame)

            if encoding is None:
                return Response({"msg": "Face not detected properly"}, status=400)

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

            User.objects.create(
                name=name,
                email=email,
                face_encoding=encoding.tobytes()
            )

            return Response({"msg": "User registered successfully"})

        except Exception as e:
            print("ERROR:", str(e))
            return Response({"msg": "Server error"}, status=500)
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

        distance = face_recognition.face_distance(
            [stored_encoding], encoding
        )[0]

        if distance < 0.5:

            today = date.today()

            already_marked = Attendance.objects.filter(
                user=user,
                date=today
            ).exists()

            if already_marked:
                return Response({
                    "msg": "Attendance already marked today"
                })

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