import React, { useState } from "react";
import { Layout, Select, Checkbox, Table, Row, Col } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

const { Content } = Layout;
const { Option } = Select;

const dataSets = {
  sales: [
    { date: "2024-01-01", amount: 500, product: "Product A" },
    { date: "2024-01-02", amount: 700, product: "Product B" },
    { date: "2024-01-03", amount: 200, product: "Product C" },
  ],
  users: [
    { date: "2024-01-01", amount: 10, product: "User A" },
    { date: "2024-01-02", amount: 15, product: "User B" },
    { date: "2024-01-03", amount: 8, product: "User C" },
  ],
  products: [
    { date: "2024-01-01", amount: 50, product: "Widget A" },
    { date: "2024-01-02", amount: 70, product: "Widget B" },
    { date: "2024-01-03", amount: 20, product: "Widget C" },
  ],
};

const ReportBuilder = () => {
  const [selectedData, setSelectedData] = useState("sales");
  const [chartType, setChartType] = useState("bar");
  const [selectedFields, setSelectedFields] = useState([
    "date",
    "amount",
    "product",
  ]);

  const data = dataSets[selectedData];

  // Configure Chart Data
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: selectedData.charAt(0).toUpperCase() + selectedData.slice(1),
        data: data.map((item) => item.amount),
        backgroundColor: ["#96cfbc", "#439397", "#276074"],
        borderColor: "#0c3049",
        borderWidth: 1,
      },
    ],
  };

  // Table Columns
  const columns = selectedFields.map((field) => ({
    title: field.charAt(0).toUpperCase() + field.slice(1),
    dataIndex: field,
    key: field,
  }));

  // Handle Field Selection
  const handleFieldChange = (checkedValues) => {
    setSelectedFields(checkedValues);
  };

  return (
    <Layout>
      <Content style={{ padding: "24px", background: "#f0f2f5" }}>
        <Row gutter={[16, 16]}>
          {/* Dropdown for Table Selection */}
          <Col span={6}>
            <Select
              defaultValue="sales"
              style={{ width: "100%" }}
              onChange={setSelectedData}
            >
              <Option value="sales">Sales Data</Option>
              <Option value="users">User Data</Option>
              <Option value="products">Product Data</Option>
            </Select>
          </Col>

          {/* Dropdown for Chart Type */}
          <Col span={6}>
            <Select
              defaultValue="bar"
              style={{ width: "100%" }}
              onChange={setChartType}
            >
              <Option value="bar">Bar Chart</Option>
              <Option value="pie">Pie Chart</Option>
              <Option value="line">Line Chart</Option>
            </Select>
          </Col>

          {/* Checkbox for Fields */}
          <Col span={12}>
            <Checkbox.Group
              options={[
                { label: "Date", value: "date" },
                { label: "Amount", value: "amount" },
                { label: "Product", value: "product" },
              ]}
              defaultValue={["date", "amount", "product"]}
              onChange={handleFieldChange}
            />
          </Col>
        </Row>

        {/* Chart Rendering */}
        <div style={{ marginTop: "24px", textAlign: "center" }}>
          {chartType === "bar" && (
            <div style={{ width: "400px", height: "300px", margin: "0 auto" }}>
              <Bar data={chartData} options={{ maintainAspectRatio: false }} />
            </div>
          )}
          {chartType === "pie" && (
            <div style={{ width: "300px", height: "300px", margin: "0 auto" }}>
              <Pie data={chartData} options={{ maintainAspectRatio: false }} />
            </div>
          )}
          {chartType === "line" && (
            <div style={{ width: "400px", height: "300px", margin: "0 auto" }}>
              <Line data={chartData} options={{ maintainAspectRatio: false }} />
            </div>
          )}
        </div>

        {/* Table Rendering */}
        <div style={{ marginTop: "24px" }}>
          <Table
            dataSource={data}
            columns={columns}
            rowKey={(record) => record.date}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default ReportBuilder;
