from transformers import pipeline, MT5Tokenizer, MT5ForConditionalGeneration
from torch import cuda
import sys
sys.stdout.reconfigure(encoding='utf-8')

# โหลด tokenizer และ model
model_name = "EXt1/KMUTT-CPE35-thai-mt5base-summarizer"
tokenizer = MT5Tokenizer.from_pretrained(model_name)
model = MT5ForConditionalGeneration.from_pretrained(model_name)

# ฟังก์ชันสำหรับคำนวณขนาดของโมเดล
def get_model_size_in_gb(model):
    total_params = sum(p.numel() for p in model.parameters())  # จำนวนพารามิเตอร์ทั้งหมด
    model_size_bytes = total_params * 4  # 4 ไบต์ต่อพารามิเตอร์ (FP32)
    model_size_gb = model_size_bytes / (1024 ** 3)  # แปลงจากไบต์เป็น GB
    return model_size_gb

# แสดงขนาดของโมเดล
model_size = get_model_size_in_gb(model)
print(f"Model size: {model_size:.2f} GB")

# สร้าง pipeline
summarizer = pipeline(
    "summarization",
    model=model,
    tokenizer=tokenizer,
    device=0 if cuda.is_available() else -1
)

# ข้อความที่ต้องการสรุป
sentence = """มีการแจ้งเตือนว่า ธนาคารกรุงไทย จะใช้เกณฑ์ใหม่ในการยืนยันตัวตนก่อนทำธุรกรรมผ่าน Mobile Banking โดยผู้ใช้งานแอปฯ Krungthai NEXT และ แอปฯ “เป๋าตัง” ต้อง สแกนใบหน้า ก่อนทำธุรกรรมต่าง ๆ เช่น โอนเงิน เติมเงิน จ่ายบิล สแกนจ่าย หรือถอนเงินไม่ใช้บัตร

ธนาคารกรุงไทย ยืนยันว่าเป็นข่าวจริง โดยการยืนยันตัวตนด้วยใบหน้าเป็นมาตรการใหม่ เพื่อยกระดับความปลอดภัยในการทำธุรกรรมผ่าน Mobile Banking ป้องกันมิจฉาชีพและลดความเสี่ยงจากการถูกแฮ็กบัญชี จึงขอแนะนำให้ผู้ใช้งานรีบอัปเดตแอปฯ ให้เป็นเวอร์ชันล่าสุด



"""

# ทดสอบการสรุป
summary = summarizer(sentence,
        max_length=512,
        min_length=200,
        num_beams=10,              
        do_sample=False,          
        length_penalty=1.1,       
        no_repeat_ngram_size=3,    
        repetition_penalty=2.0,   
        early_stopping=True
        )

# แสดงผลลัพธ์
print("Summary:", summary[0]['summary_text'])
