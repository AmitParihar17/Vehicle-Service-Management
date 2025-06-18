//  import React, { useState } from "react";
//  import { Form, Select, Switch, Button, Card, message } from "antd";
//  import { CarOutlined } from "@ant-design/icons";
//  import { baseURL } from "../../config";

//  const { Option } = Select;

//  const serviceOptions = [
//    "Engine Repair",
//    "Oil Change",
//    "Car Wash",
//    "AC Service",
//    "Tire Replacement",
//    "Battery Check",
//  ];

//  const Services = () => {
//    const [selectedServices, setSelectedServices] = useState([]);
//    const [pickup, setPickup] = useState(false);
//    const [loading, setLoading] = useState(false);

//    const handleSubmit = async () => {
//      if (selectedServices.length === 0) {
//        return message.warning("Please select at least one service.");
//      }

//      try {
//        setLoading(true);
//        const payload = {
//          services: selectedServices,
//          pickupAndDrop: pickup,
//        };


//        message.success("Your service request has been submitted!");
//        setSelectedServices([]);
//        setPickup(false);
//      } catch (error) {
//        const errorMsg =
//          error.response?.data?.message || "Something went wrong!";
//        message.error(errorMsg);
//      } finally {
//        setLoading(false);
//      }
//    };

//    return (
//      <div className="min-h-screen bg-gray-100 py-12 px-4 flex justify-center items-center">
//        <Card
//          title="Book Vehicle Services"
//          bordered={false}
//          className="w-full max-w-xl border border-red-500 shadow-lg"
//          headStyle={{ textAlign: "center", color: "#dc2626", fontSize: "24px" }}
//        >
//          <Form layout="vertical" onFinish={handleSubmit}>
//            <Form.Item
//              label="Select Services"
//              required
//              tooltip="Choose one or more services"
//            >
//              <Select
//                mode="multiple"
//                placeholder="Choose your services"
//                value={selectedServices}
//                onChange={setSelectedServices}
//              >
//                {serviceOptions.map((service) => (
//                  <Option key={service} value={service}>
//                    {service}
//                  </Option>
//                ))}
//              </Select>
//            </Form.Item>

//            <Form.Item label="Pickup & Drop-off Service">
//              <div className="flex items-center gap-4">
//                <Switch
//                  checked={pickup}
//                  onChange={setPickup}
//                  className="bg-red-500"
//                />
//                <span className="text-gray-700">
//                  {pickup ? "Enabled" : "Disabled"}
//                </span>
//              </div>
//            </Form.Item>

//            <Form.Item>
//              <Button
//                block
//                type="primary"
//                htmlType="submit"
//                icon={<CarOutlined />}
//                loading={loading}
//                className="bg-red-600 hover:bg-red-700"
//              >
//                Book Now
//              </Button>
//            </Form.Item>
//          </Form>
//        </Card>
//      </div>
//    );
//  };

//  export default Services;
import ServiceCard from "../Components/ServiceCard";
import { UseAppContext } from "../Context/AppContext";

const Services = () => {
  const {services} = UseAppContext()

  console.log("anku",services)
  return (
    <div className="p-4 mt-15">
      <h2 className="text-xl font-bold mb-4">All Services</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-5">
        {services
          .filter((service) => service)
          .map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
      </div>
    </div>
  );
};

export default Services;