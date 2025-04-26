
# import easyocr
# import cv2
# import numpy as np

# # ฟังก์ชันที่ใช้หมุนภาพให้อยู่ในแนวตั้ง
# def rotate_image(image):
#     # แปลงเป็นเทาเพื่อใช้ในการตรวจจับมุม
#     gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
#     # ใช้การตรวจจับขอบของภาพ
#     edges = cv2.Canny(gray, 50, 150, apertureSize=3)
    
#     # ค้นหาสายขอบในภาพ
#     lines = cv2.HoughLinesP(edges, 1, np.pi / 180, threshold=100, minLineLength=50, maxLineGap=10)

#     # ตรวจจับมุมของเส้นในภาพ
#     if lines is not None:
#         angles = []
#         for line in lines:
#             x1, y1, x2, y2 = line[0]
#             angle = np.arctan2(y2 - y1, x2 - x1) * 180 / np.pi  # คำนวณมุม
#             angles.append(angle)

#         # หาองศามุมเฉลี่ยจากเส้นทั้งหมด
#         median_angle = np.median(angles)

#         # หมุนภาพตามมุมที่คำนวณได้
#         height, width = image.shape[:2]
#         center = (width // 2, height // 2)
#         rotation_matrix = cv2.getRotationMatrix2D(center, median_angle, 1.0)
#         rotated_image = cv2.warpAffine(image, rotation_matrix, (width, height))

#         return rotated_image

#     return image  # ถ้าไม่พบเส้น, ไม่ทำการหมุน

# # ฟังก์ชันการปรับปรุงภาพ (ลดสัญญาณรบกวนและเพิ่มความคมชัด)
# def preprocess_image(image):
#     # แปลงเป็นขาวดำ
#     gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
#     # ลดสัญญาณรบกวน (Noise Reduction)
#     denoised = cv2.fastNlMeansDenoising(gray, None, 30, 7, 21)

#     # ปรับความคมชัด (Sharpening)
#     kernel = np.array([[0, -1, 0], [-1, 5,-1], [0, -1, 0]])  # Sharpen kernel
#     sharpened = cv2.filter2D(denoised, -1, kernel)
    
#     # ใช้ Adaptive Thresholding เพื่อแยกข้อความออกจากพื้นหลัง
#     threshed = cv2.adaptiveThreshold(sharpened, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
#                                     cv2.THRESH_BINARY, 11, 2)
#     return threshed

# # ฟังก์ชันที่ใช้ทำ OCR จากรูปภาพ
# def ocr_from_image(image_path):
#     # โหลดรูปภาพจากพาธที่ส่งเข้ามา
#     image = cv2.imread(image_path)
    
#     # ตรวจสอบว่าภาพโหลดสำเร็จหรือไม่
#     if image is None:
#         print("Error: Image not found or cannot be loaded")
#         return
    
#     # หมุนภาพให้อยู่ในแนวตั้งหากจำเป็น
#     rotated_image = rotate_image(image)

#     # ปรับภาพให้มีความคมชัดและลดสัญญาณรบกวน
#     processed_image = preprocess_image(rotated_image)
    
#     # แปลงภาพจาก BGR (OpenCV โหลดเป็น BGR) เป็น RGB
#     image_rgb = cv2.cvtColor(processed_image, cv2.COLOR_BGR2RGB)
    
#     # ใช้ easyocr ในการแปลงภาพเป็นข้อความ
#     reader = easyocr.Reader(['th', 'en'])  # เพิ่มภาษาไทยและภาษาอังกฤษ
#     result = reader.readtext(image_rgb, detail=0)  # detail=0 จะทำให้ผลลัพธ์เป็นข้อความเท่านั้น

#     if result:
#         print("ข้อความที่พบในภาพ:")
#         for text in result:
#             print(text)
#     else:
#         print("ไม่พบข้อความในภาพ")

# # ทดสอบการใช้งาน
# if __name__ == "__main__":
#     # รับพาธของรูปภาพจากผู้ใช้หรือจากตัวแปรอื่น
#     image_path = "C:\\Users\\Janejojija\\Downloads\\S__16924676.jpg"  # พาธของภาพที่คุณอัปโหลด
#     ocr_from_image(image_path)

import easyocr
import cv2
import numpy as np
from PIL import Image

# ฟังก์ชันที่ใช้ทำ OCR จากรูปภาพ
def ocr_from_image(image_path):
    image = cv2.imread(image_path)
    
    if image is None:
        print("Error: Image not found or cannot be loaded")
        return
    
    # แปลงภาพจาก BGR (OpenCV โหลดเป็น BGR) เป็น RGB
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    
    # ใช้ easyocr ในการแปลงภาพเป็นข้อความ
    reader = easyocr.Reader(['th', 'en'])  
    result = reader.readtext(image_rgb, detail=0)  # detail=0 จะทำให้ผลลัพธ์เป็นข้อความเท่านั้น

    if result:
        print("ข้อความที่พบในภาพ:")
        for text in result:
            print(text)
    else:
        print("ไม่พบข้อความในภาพ")

# ทดสอบการใช้งาน
if __name__ == "__main__":
    image_path = "C:\\Users\\Janejojija\\Downloads\\GApIOu9bgAA1Fc6.jpg"
    ocr_from_image(image_path)

# import easyocr
# import cv2
# import numpy as np

# # ฟังก์ชันที่ใช้ทำ OCR จากรูปภาพ
# def ocr_from_image(image_path):
#     # โหลดรูปภาพจากพาธที่ส่งเข้ามา
#     image = cv2.imread(image_path)
    
#     # ตรวจสอบว่าภาพโหลดสำเร็จหรือไม่
#     if image is None:
#         print("Error: Image not found or cannot be loaded")
#         return
    
#     # การแปลงภาพเป็นโทนขาวดำ (Grayscale) เพื่อให้ OCR อ่านได้ดีขึ้น
#     gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
#     # ปรับแสงและคอนทราสต์ของภาพ
#     contrast_image = cv2.convertScaleAbs(gray_image, alpha=2.0, beta=50)
    
#     # การลดความเบลอ (Denoising) ด้วยวิธีที่ดีกว่า
#     denoised_image = cv2.fastNlMeansDenoising(contrast_image, None, 30, 7, 21)
    
#     # ใช้การเพิ่มความคมชัด (Sharpening) ระมัดระวัง
#     kernel = np.array([[-1, -1, -1], [-1, 9,-1], [-1, -1, -1]])
#     sharpened_image = cv2.filter2D(denoised_image, -1, kernel)
    
#     # แปลงภาพจาก BGR (OpenCV โหลดเป็น BGR) เป็น RGB
#     image_rgb = cv2.cvtColor(sharpened_image, cv2.COLOR_GRAY2RGB)
    
#     # ใช้ easyocr ในการแปลงภาพเป็นข้อความ
#     reader = easyocr.Reader(['th', 'en'])  # เพิ่มภาษาไทยและภาษาอังกฤษ
#     result = reader.readtext(image_rgb, detail=0)  # detail=0 จะทำให้ผลลัพธ์เป็นข้อความเท่านั้น

#     if result:
#         print("ข้อความที่พบในภาพ:")
#         for text in result:
#             print(text)
#     else:
#         print("ไม่พบข้อความในภาพ")

# # ทดสอบการใช้งาน
# if __name__ == "__main__":
#     # รับพาธของรูปภาพจากผู้ใช้หรือจากตัวแปรอื่น
#     image_path = "C:\\Users\\Janejojija\\Downloads\\traffic-sign-illustrate.jpg"  # ใช้พาธที่ถูกต้อง
#     ocr_from_image(image_path)
