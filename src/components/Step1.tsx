"use client";
import React, { useState, useEffect } from 'react';
import { Button, Card, Typography, Form, Select, Radio, InputNumber } from 'antd';
import { FireOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useRouter } from "next/navigation";
const { Title, Text } = Typography;
const { Option } = Select;

export default function CarnivoreSurveyForm() {
    const [form] = Form.useForm();
    const [isVisible, setIsVisible] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [heightUnit, setHeightUnit] = useState('cm');
    const [weightUnit, setWeightUnit] = useState('kg');
    const router = useRouter();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleFormChange = () => {
        const values = form.getFieldsValue();
        const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);

        // Check required fields based on height unit
        let requiredFields = ['gender', 'age', 'weight'];
        if (heightUnit === 'cm') {
            requiredFields.push('height');
        } else {
            requiredFields.push('height_feet', 'height_inches');
        }

        const filledFields = requiredFields.filter(field => {
            const value = values[field];
            return value !== undefined && value !== '' && value !== null;
        }).length;

        setIsFormValid(filledFields >= requiredFields.length && !hasErrors);
    };

    const handleHeightUnitChange = (unit: any) => {
        setHeightUnit(unit);
        // Clear height values when switching units
        if (unit === 'cm') {
            form.setFieldsValue({ height_feet: undefined, height_inches: undefined });
        } else {
            form.setFieldsValue({ height: undefined });
        }
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            // Format height
            let formattedHeight;
            if (heightUnit === 'cm') {
                formattedHeight = { value: values.height, unit: 'cm' };
            } else {
                formattedHeight = {
                    value: { feet: values.height_feet || 0, inches: values.height_inches || 0 },
                    unit: 'ft'
                };
            }

            // Format weight
            const formattedWeight = {
                value: values.weight,
                unit: weightUnit
            };

            // Final object (same format as screenshot)
            const data = {
                age: values.age,
                height: formattedHeight,
                cWeight: formattedWeight,
                extendedvaluekey: "not-provided", // you can adjust this
                gender: values.gender
            };

            // Save to localStorage
            localStorage.setItem("age", JSON.stringify(data.age));
            localStorage.setItem("cWeight", JSON.stringify(data.cWeight));
            localStorage.setItem("gender", data.gender);
            localStorage.setItem("height", JSON.stringify(data.height));
            router.push("/step2")

        } catch (errorInfo) {
            console.log("Validation failed:", errorInfo);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-red-800 relative overflow-hidden">


            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 relative z-10">
                {/* Header */}
                <div className={`text-center mb-6 sm:mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center shadow-xl animate-pulse">
                        <span className="text-xl sm:text-2xl">🥩</span>
                    </div>
                    <Title level={1} className="!text-orange-400 !mb-2 !text-xl sm:!text-2xl font-medium tracking-wide">
                        CARNIVORE MEAL PLANNER
                    </Title>
                    <Title level={2} className="!text-white !mb-4 !text-2xl sm:!text-3xl font-normal">
                        Tell Us About Yourself
                    </Title>
                </div>

                {/* Form */}
                <div className={`max-w-lg mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl mx-4 sm:mx-0">
                        <div className="p-4 sm:p-8">
                            <div className="text-center mb-6">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                                    <FireOutlined className="text-lg sm:text-xl text-white" />
                                </div>
                                <Title level={3} className="!text-gray-800 !mb-2 !text-lg sm:!text-xl font-medium">
                                    Quick Survey
                                </Title>
                                <Text className="text-gray-600 font-light text-sm sm:text-base">
                                    Help us personalize your experience
                                </Text>
                            </div>

                            <Form
                                form={form}
                                layout="vertical"
                                onFieldsChange={handleFormChange}
                                size="large"
                            >
                                {/* Gender */}
                                <Form.Item
                                    name="gender"
                                    label={
                                        <span className="text-gray-700 font-medium text-sm sm:text-base">
                                            Gender
                                        </span>
                                    }
                                    rules={[{ required: true, message: "Please select your gender!" }]}
                                >
                                    <Radio.Group className="w-full">
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            <Radio.Button
                                                value="male"
                                                className="!h-14 !rounded-xl !flex !items-center !justify-center !border !border-gray-300 
                   !bg-white !transition-all !duration-300 hover:!border-red-400 hover:!shadow-md 
                   [&.ant-radio-button-wrapper-checked]:!bg-red-500 
                   [&.ant-radio-button-wrapper-checked]:!text-white 
                   [&.ant-radio-button-wrapper-checked]:!border-red-500 
                   [&.ant-radio-button-wrapper-checked]:!shadow-lg"
                                            >
                                                <span className="flex items-center gap-2">
                                                    <span>👨</span>
                                                    <span className="text-sm sm:text-base">Male</span>
                                                </span>
                                            </Radio.Button>

                                            <Radio.Button
                                                value="female"
                                                className="!h-14 !rounded-xl !flex !items-center !justify-center !border !border-gray-300 
                   !bg-white !transition-all !duration-300 hover:!border-red-400 hover:!shadow-md 
                   [&.ant-radio-button-wrapper-checked]:!bg-red-500 
                   [&.ant-radio-button-wrapper-checked]:!text-white 
                   [&.ant-radio-button-wrapper-checked]:!border-red-500 
                   [&.ant-radio-button-wrapper-checked]:!shadow-lg"
                                            >
                                                <span className="flex items-center gap-2">
                                                    <span>👩</span>
                                                    <span className="text-sm sm:text-base">Female</span>
                                                </span>
                                            </Radio.Button>

                                            <Radio.Button
                                                value="prefer-not-to-say"
                                                className="!h-14 !rounded-xl !flex !items-center !justify-center !border !border-gray-300 
                   !bg-white !transition-all !duration-300 hover:!border-red-400 hover:!shadow-md 
                   [&.ant-radio-button-wrapper-checked]:!bg-red-500 
                   [&.ant-radio-button-wrapper-checked]:!text-white 
                   [&.ant-radio-button-wrapper-checked]:!border-red-500 
                   [&.ant-radio-button-wrapper-checked]:!shadow-lg"
                                            >
                                                <span className="flex items-center gap-2">
                                                    <span>🤐</span>
                                                    <span className="text-sm sm:text-base">Rather not say</span>
                                                </span>
                                            </Radio.Button>
                                        </div>
                                    </Radio.Group>
                                </Form.Item>



                                {/* Age */}
                                <Form.Item
                                    name="age"
                                    label={<span className="text-gray-700 font-medium text-sm sm:text-base">Age</span>}
                                    rules={[
                                        { required: true, message: 'Please enter your age!' },
                                        { type: 'number', min: 16, max: 100, message: 'Age must be between 16 and 100!' }
                                    ]}
                                >
                                    <InputNumber
                                        placeholder="Enter your age"
                                        className="w-full rounded-xl"
                                        style={{ height: '48px' }}
                                        min={16}
                                        max={100}
                                    />
                                </Form.Item>

                                {/* Height */}
                                <Form.Item
                                    label={<span className="text-gray-700 font-medium text-sm sm:text-base">Height</span>}
                                >
                                    <div className="space-y-2 sm:space-y-0">
                                        {heightUnit === 'cm' ? (
                                            <div className="flex gap-2">
                                                <Form.Item
                                                    name="height"
                                                    rules={[{ required: true, message: 'Please enter your height!' }]}
                                                    className="flex-1 mb-0"
                                                >
                                                    <InputNumber
                                                        placeholder="170"
                                                        className="w-full rounded-xl"
                                                        style={{ height: '48px' }}
                                                        min={100}
                                                        max={250}
                                                    />
                                                </Form.Item>
                                                <Form.Item name="height_unit" className="mb-0" initialValue="cm">
                                                    <Select
                                                        style={{ width: 80, height: '48px' }}
                                                        onChange={handleHeightUnitChange}
                                                        className="rounded-xl"
                                                    >
                                                        <Option value="cm">cm</Option>
                                                        <Option value="ft">ft/in</Option>
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="flex gap-2 sm:gap-2">
                                                    <Form.Item
                                                        name="height_feet"
                                                        rules={[{ required: true, message: 'Please enter feet!' }]}
                                                        className="flex-1 mb-0"
                                                    >
                                                        <InputNumber
                                                            placeholder="5"
                                                            className="w-full rounded-xl"
                                                            style={{ height: '48px' }}
                                                            min={3}
                                                            max={8}
                                                            addonAfter="ft"
                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                        name="height_inches"
                                                        rules={[{ required: true, message: 'Please enter inches!' }]}
                                                        className="flex-1 mb-0"
                                                    >
                                                        <InputNumber
                                                            placeholder="8"
                                                            className="w-full rounded-xl"
                                                            style={{ height: '48px' }}
                                                            min={0}
                                                            max={11}
                                                            addonAfter="in"
                                                        />
                                                    </Form.Item>
                                                </div>
                                                <div className="flex justify-end">
                                                    <Form.Item name="height_unit" className="mb-0" initialValue="cm">
                                                        <Select
                                                            style={{ width: 80, height: '48px' }}
                                                            onChange={handleHeightUnitChange}
                                                            className="rounded-xl"
                                                        >
                                                            <Option value="cm">cm</Option>
                                                            <Option value="ft">ft/in</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </Form.Item>

                                {/* Current Weight */}
                                <Form.Item
                                    label={<span className="text-gray-700 font-medium text-sm sm:text-base">Current Weight</span>}
                                >
                                    <div className="flex gap-2">
                                        <Form.Item
                                            name="weight"
                                            rules={[{ required: true, message: 'Please enter your weight!' }]}
                                            className="flex-1 mb-0"
                                        >
                                            <InputNumber
                                                placeholder={weightUnit === 'kg' ? "70" : "154"}
                                                className="w-full rounded-xl"
                                                style={{ height: '48px' }}
                                                min={weightUnit === 'kg' ? 30 : 66}
                                                max={weightUnit === 'kg' ? 300 : 660}
                                            />
                                        </Form.Item>
                                        <Form.Item name="weight_unit" className="mb-0" initialValue="kg">
                                            <Select
                                                style={{ width: 80, height: '48px' }}
                                                onChange={setWeightUnit}
                                                className="rounded-xl"
                                            >
                                                <Option value="kg">kg</Option>
                                                <Option value="lbs">lbs</Option>
                                            </Select>
                                        </Form.Item>
                                    </div>
                                </Form.Item>

                                <Button

                                    type="primary"
                                    size="large"
                                    onClick={handleSubmit}
                                    disabled={!isFormValid}
                                    className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 border-0 rounded-xl text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 mt-6"
                                >
                                    Continue <ArrowRightOutlined />
                                </Button>

                                <div className="mt-4 text-center">
                                    <Text className="text-gray-500 text-xs sm:text-sm font-light">
                                        🔒 100% secure • No spam
                                    </Text>
                                </div>
                            </Form>
                        </div>
                    </Card>
                </div>
            </div>

            <style jsx>{`
                .ant-radio-button-wrapper {
                    border-radius: 8px !important;
                    border: 1px solid #d1d5db !important;
                    min-height: 48px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                }
                .ant-radio-button-wrapper-checked {
                    background: linear-gradient(to right, #f97316, #dc2626) !important;
                    border-color: #f97316 !important;
                    color: white !important;
                }
                .ant-radio-button-wrapper:hover {
                    border-color: #f97316 !important;
                }
                .ant-input-number-addon {
                    background: #f3f4f6 !important;
                    border: none !important;
                    color: #6b7280 !important;
                    font-size: 12px !important;
                }
                
                /* Mobile-specific adjustments */
                @media (max-width: 640px) {
                    .ant-radio-button-wrapper {
                        padding: 8px 12px !important;
                    }
                    
                    .ant-input-number {
                        font-size: 14px !important;
                    }
                    
                    .ant-select-selection-item {
                        font-size: 14px !important;
                    }
                    
                    /* Ensure mobile height inputs have proper spacing */
                    .ant-input-number-addon {
                        font-size: 11px !important;
                        min-width: 24px !important;
                    }
                }
            `}</style>
        </div>
    );
}