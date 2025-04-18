import * as React from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

const GaugeChart = () => {
  return (
    <div className="flex justify-center items-center ">
      <div style={{ width: "300px", height: "300px" }}>
        {" "}
        {/* ปรับขนาดตามที่ต้องการ */}
        <Gauge
          value={10} // เปลี่ยนค่าได้ตามที่ต้องการ
          startAngle={-110} // เริ่มต้นมุมที่ -110 องศา
          endAngle={110} // สิ้นสุดที่ 110 องศา
          sx={{
            [`& .${gaugeClasses.valueText}`]: {
              fontSize: "20px", // ปรับขนาดตัวเลข
              transform: "translate(0px, 1px)",
            },
          }}
          text={({ value }) => `${value}`} // แสดงค่าในเกจ
        />
      </div>
    </div>
  );
};

export default GaugeChart;
