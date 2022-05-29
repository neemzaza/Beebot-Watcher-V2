let questionMap = new Map();

// คำถามของคนส่วนใหญ่ โดย question คือหัวข้อคำถาม เลขข้อเรียงตามลำดับ ซ้ายไปขวา

// ส่วน answer คือคำตอบ เลขข้อเรียงตามลำดับ ซ้ายไปขวาเช่นกัน

let question = ["unable to connect to world", "online-mode", "paper กับ spigot", "spigot กับ paper", "เซิฟหน่วง", "ขึ้นข้อความแดงบนหน้า console", "geyser-java16", "เปลี่ยนไปใช้ zerotier"]

let answer = ["ลองดูคลิปนี้! https://youtu.be/KBnUjWcz9Ds", "ใน server.properties ตรง online-mode ถ้าอยากให้มายคราฟไอดีแท้เข้าอย่างเดียวให้ปรับเป็น true นะ ส่วนถ้าอยากให้ทั้งแท้และไม่แท้เข้าให้ปรับเป็น false", "paper จะดัดแปลงจาก spigot อีกที ซึ่งมันจะแก้ไขบัคบางอย่างที่มีใน minecraft ด้วย!", "paper จะดัดแปลงจาก spigot อีกที ซึ่งมันจะแก้ไขบัคบางอย่างที่มีใน minecraft ด้วย!" ,"ลองเพิ่มแรมที่ตัว run.bat ดูนะ โดยไปแก้ไขตรง -Xms1024M ถ้าแรมเครื่องคุณ 8GB แนะนำให้เพิ่มต่อหลัง -Xm...24M เป็น -Xmx5G ครับ หรือถ้าแรมมากกว่า 8GB ก็ให้ปรับตามความเหมาะสม!", "ไม่ต้องตกใจ! มันเกิดจากการที่เซิฟไม่ตอบสนองหรือเซิฟค้างชั่วขณะเท่านั้น ลองไปเพิ่มแรมอาจจะหายดี" ,"ลองดูคลิปนี้! https://youtu.be/qunb4jfbNIE" ,"ลองดูคลิปนี้! https://youtu.be/gxryiAMUDmI"]

for(let i = 0; i <= question.length; i++) {
  questionMap.set(question[i], answer[i])
}

export {questionMap}