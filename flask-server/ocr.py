# import easyocr
# import cv2
# import numpy as np
# from PIL import Image
# import pytesseract
# import matplotlib.pyplot as plt

# # ฟังก์ชันที่ใช้ทำ OCR จากรูปภาพ
# def ocr_from_image(image_path):
#     image = cv2.imread(image_path)
    
#     if image is None:
#         print("Error: Image not found or cannot be loaded")
#         return
    
#     # แปลงภาพจาก BGR (OpenCV โหลดเป็น BGR) เป็น RGB  
#     image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    
#     # ใช้ easyocr ในการแปลงภาพเป็นข้อความ
#     reader = easyocr.Reader(['th', 'en'])  
#     result = reader.readtext(image_rgb, detail=0)  # detail=0 จะทำให้ผลลัพธ์เป็นข้อความเท่านั้น

#     if result:
#         print("ข้อความที่พบในภาพ:")
#         for text in result:
#             print(text)
#     else:
#         print("ไม่พบข้อความในภาพ")

# # ทดสอบการใช้งาน
# if __name__ == "__main__":
#     image_path = "C:\\Users\\Janejojija\\Downloads\\GApIOu9bgAA1Fc6.jpg"
#     ocr_from_image(image_path)

# import easyocr
# import cv2
# import numpy as np
# from PIL import Image
# import pytesseract
# import matplotlib.pyplot as plt

# # ฟังก์ชันที่ใช้ทำ OCR จากรูปภาพ โดยใช้ทั้ง EasyOCR และ Tesseract
# def ocr_from_image(image_path):
#     # อ่านภาพจากเส้นทางที่ระบุ
#     image = cv2.imread(image_path)
    
#     if image is None:
#         print("Error: Image not found or cannot be loaded")
#         return
    
#     # ปรับขนาดและปรับภาพให้ชัดเจน (Resizing, Contrast, Sharpness)
#     image_resized = cv2.resize(image, None, fx=1.5, fy=1.5, interpolation=cv2.INTER_LINEAR)  # ขยายภาพ
#     gray = cv2.cvtColor(image_resized, cv2.COLOR_BGR2GRAY)  # แปลงเป็นภาพขาวดำ
#     enhanced_img = cv2.equalizeHist(gray)  # ปรับคอนทราสต์ภาพ

#     # แปลงภาพจาก BGR (OpenCV โหลดเป็น BGR) เป็น RGB  
#     image_rgb = cv2.cvtColor(enhanced_img, cv2.COLOR_BGR2RGB)

#     # ใช้ easyocr ในการแปลงภาพเป็นข้อความ
#     reader = easyocr.Reader(['th', 'en'])  # อ่านภาษาไทยและอังกฤษ
#     result_easyocr = reader.readtext(image_rgb, detail=0)  # detail=0 จะทำให้ผลลัพธ์เป็นข้อความเท่านั้น

#     if result_easyocr:
#         print("ข้อความที่พบในภาพจาก EasyOCR:")
#         for text in result_easyocr:
#             print(text)
#     else:
#         print("ไม่พบข้อความในภาพจาก EasyOCR")

#     # ใช้ Tesseract เพื่อดึงข้อความจากภาพ (เพิ่มความแม่นยำ)
#     result_tesseract = pytesseract.image_to_string(enhanced_img, lang='tha+eng')
    
#     if result_tesseract.strip():
#         print("\nข้อความที่พบในภาพจาก Tesseract OCR:")
#         print(result_tesseract)
#     else:
#         print("ไม่พบข้อความในภาพจาก Tesseract OCR")

# # ทดสอบการใช้งาน
# if __name__ == "__main__":
#     # image_path = "C:\\Users\\Janejojija\\Downloads\\GApIOu9bgAA1Fc6.jpg"
#     image_path = "C:\\Users\\Janejojija\\Downloads\\traffic-sign-illustrate.jpg"
#     ocr_from_image(image_path)

import easyocr
import cv2
import numpy as np
from PIL import Image
import pytesseract
import matplotlib.pyplot as plt

# ฟังก์ชันที่ใช้ทำ OCR จากรูปภาพ โดยใช้ทั้ง EasyOCR และ Tesseract
def ocr_from_image(image_path):
    # อ่านภาพจากเส้นทางที่ระบุ
    image = cv2.imread(image_path)
    
    if image is None:
        print("Error: Image not found or cannot be loaded")
        return
    
    # ปรับขนาดและปรับภาพให้ชัดเจน (Resizing, Contrast, Sharpness)
    image_resized = cv2.resize(image, None, fx=1.5, fy=1.5, interpolation=cv2.INTER_LINEAR)  # ขยายภาพ
    gray = cv2.cvtColor(image_resized, cv2.COLOR_BGR2GRAY)  # แปลงเป็นภาพขาวดำ
    enhanced_img = cv2.equalizeHist(gray)  # ปรับคอนทราสต์ภาพ

    # แปลงภาพจาก BGR (OpenCV โหลดเป็น BGR) เป็น RGB  
    image_rgb = cv2.cvtColor(enhanced_img, cv2.COLOR_BGR2RGB)

    # ใช้ easyocr ในการแปลงภาพเป็นข้อความ
    reader = easyocr.Reader(['th', 'en'])  # อ่านภาษาไทยและอังกฤษ
    result_easyocr = reader.readtext(image_rgb, detail=0)  # detail=0 จะทำให้ผลลัพธ์เป็นข้อความเท่านั้น

    if result_easyocr:
        print("ข้อความที่พบในภาพจาก EasyOCR:")
        for text in result_easyocr:
            print(text)
    else:
        print("ไม่พบข้อความในภาพจาก EasyOCR")

    # ใช้ Tesseract เพื่อดึงข้อความจากภาพ (เพิ่มความแม่นยำ)
    result_tesseract = pytesseract.image_to_string(enhanced_img, lang='tha+eng')
    
    if result_tesseract.strip():
        print("\nข้อความที่พบในภาพจาก Tesseract OCR:")
        print(result_tesseract)
    else:
        print("ไม่พบข้อความในภาพจาก Tesseract OCR")

# ทดสอบการใช้งาน
if __name__ == "__main__":
    image_path = "C:\\Users\\Janejojija\\Pictures\\Screenshots\\Screenshot 2025-04-25 140008.png"
    # image_path = "C:\\Users\\Janejojija\\Downloads\\traffic-sign-illustrate.jpg"  
    ocr_from_image(image_path)

# import cv2
# import pytesseract
# import numpy as np
# import easyocr
# import matplotlib.pyplot as plt

# # ฟังก์ชันเพื่อหามุมการเอียงของข้อความ
# def correct_text_skew(image):
#     # แปลงภาพเป็นสีเทา
#     gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
#     # ใช้การตรวจจับขอบ (Canny edge detection)
#     edges = cv2.Canny(gray, 50, 150, apertureSize=3)
    
#     # หาคอนทัวร์ในภาพ (Contours)
#     contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
#     # หามุมเอียงของแต่ละคอนทัวร์และหมุนเฉพาะส่วนที่มีข้อความเอียง
#     for contour in contours:
#         # ใช้ cv2.minAreaRect เพื่อหามุมเอียง
#         rect = cv2.minAreaRect(contour)
#         angle = rect[2]
        
#         if angle < -10:
#             angle = 45 + angle
#         else:
#             angle = angle
        
#         # หมุนภาพตามมุมที่คำนวณได้
#         (h, w) = image.shape[:2]
#         center = (w // 2, h // 2)
#         matrix = cv2.getRotationMatrix2D(center, angle, 1.0)
#         rotated_image = cv2.warpAffine(image, matrix, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)
    
#     return rotated_image

# # ฟังก์ชันที่ใช้ทำ OCR จากรูปภาพ โดยใช้ทั้ง EasyOCR และ Tesseract
# def ocr_from_image(image_path):
#     image = cv2.imread(image_path)
    
#     if image is None:
#         print("Error: Image not found or cannot be loaded")
#         return
    
#     # แก้ไขมุมเอียงของข้อความ
#     corrected_image = correct_text_skew(image)
    
#     # แสดงภาพที่หมุนแล้ว
#     plt.imshow(cv2.cvtColor(corrected_image, cv2.COLOR_BGR2RGB))
#     plt.title("Corrected Image with Deskewed Text")
#     plt.axis('off')
#     plt.show()
    
#     # ใช้ EasyOCR ในการทำ OCR
#     reader = easyocr.Reader(['th', 'en'])  # อ่านภาษาไทยและอังกฤษ
#     result_easyocr = reader.readtext(corrected_image, detail=0)  # detail=0 จะทำให้ผลลัพธ์เป็นข้อความเท่านั้น
    
#     if result_easyocr:
#         print("ข้อความที่พบในภาพจาก EasyOCR:")
#         for text in result_easyocr:
#             print(text)
#     else:
#         print("ไม่พบข้อความในภาพจาก EasyOCR")

#     # ใช้ Tesseract OCR ในการอ่านข้อความจากภาพที่หมุนแล้ว
#     result_tesseract = pytesseract.image_to_string(corrected_image, lang='tha+eng')
    
#     if result_tesseract.strip():
#         print("\nข้อความที่พบในภาพจาก Tesseract OCR:")
#         print(result_tesseract)
#     else:
#         print("ไม่พบข้อความในภาพจาก Tesseract OCR")
# if __name__ == "__main__":
#      image_path = "C:\\Users\\Janejojija\\Downloads\\traffic-sign-illustrate.jpg"
#     image_path = "C:\\Users\\Janejojija\\Downloads\\GApIOu9bgAA1Fc6.jpg"
#     ocr_from_image(image_path)