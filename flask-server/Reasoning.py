from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM
from peft import PeftModel

base = AutoModelForCausalLM.from_pretrained("scb10x/typhoon-7b")
model = PeftModel.from_pretrained(base, "EXt1/KMUTT-CPE35-Typhoon-7B-news-reasoning")
tok = AutoTokenizer.from_pretrained("scb10x/typhoon-7b")

pipe = pipeline("text-generation", model=model, tokenizer=tok)

prompt = 'ข่าวนี้น่าเชื่อถือหรือไม่: "รัฐบาลประกาศเลื่อนวันหยุดประจำชาติเป็นสัปดาห์หน้า" เหตุผลคือ'
print(pipe(prompt, max_new_tokens=100, do_sample=False)[0]["generated_text"])
