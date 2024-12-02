import { Link } from "react-router-dom";

export function NewsCheck() {
  return [
    {
      Title: "ข้อความสำหรับตรวจสอบข่าว",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/83b8abab8dd36a4429a61793747b95bb5ede706c31751a9d392447a5527ddd25?placeholderIfAbsent=true&apiKey=d94fca7f07964371945234ca4f7476b3",
      alt: "TextCheck",
      Points: "พิมพ์ข้อความ หรือใส่ข้อความเพื่อตรวจสอบข่าว",
      link: "./TextCheck",
    },
    {
      Title: "รูปภาพเพื่อตรวจสอบข่าว",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4fffe51a59cb3f9c28051833d3d122d47bafc8a1825840f55ef306edb9297152?placeholderIfAbsent=true&apiKey=d94fca7f07964371945234ca4f7476b3",
      alt: "PhotoCheck",
      Points: "สามารถอัปโหลดรูปภาพเพื่อตรวจสอบข่าวได้",
      link: "./PhotoCheck",
    },
    {
      Title: "URL เพื่อตรวจสอบข่าว",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e9c8698ccd0ec2c1bd2d7a639ab14e9df3ac6326f91cc810e39a660f782db66b?placeholderIfAbsent=true&apiKey=d94fca7f07964371945234ca4f7476b3",
      alt: "LinkCheck",
      Points: "สามารถใส่ลิ้งค์ URL เพื่อตรวจสอบข่าวได้",
      link: "./LinkCheck",
    },
  ];
}
