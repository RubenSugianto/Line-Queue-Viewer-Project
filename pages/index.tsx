// import { WithDefaultLayout } from "@/components/DefautLayout";
import { Page } from "@/types/Page"
import { Alert, Button, Col, Input, Row, Space} from "antd";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from "jotai";
import { cashier1Atom, cashier2Atom, cashier3Atom, NameData} from "@/data/Queue1";
import CreateNameForm from "@/types/CreateNameForm";
import { CreateNameFormSchema, CreateNameFormType } from "@/schemas/CreateNameSchema";

/**
 * Create new name page component.
 * @returns 
 */
const CreateNamePage: Page = () => {
    return <>
        {DisplayQueue({})}
        {CreateForm({})}
    </>
}

/**
 * Create name form component using React Hook Form & Zod validation.
 * @returns 
 */
const CreateForm: React.FC = () => {
    const { handleSubmit, control, formState: { errors }, reset } = useForm<CreateNameFormType>({
        resolver: zodResolver(CreateNameFormSchema),
        mode: 'onChange'
    });

    const [cashier1Names, setCashier1Names] = useAtom(cashier1Atom);
    const [cashier2Names, setCashier2Names] = useAtom(cashier2Atom);
    const [cashier3Names, setCashier3Names] = useAtom(cashier3Atom);



    const [isAlertVisible, setIsAlertVisible] = useState(false);

    const isDuplicateName = (name: string): boolean => {
        if (cashier1Names.some(item => item.name === name)) {
            return true;
        }
        if (cashier2Names.some(item => item.name === name)) {
            return true;
        }
        if (cashier3Names.some(item => item.name === name)) {
            return true;
        }
        return false;
    };

    /**
     * Handle the form submission event.
     * @param e 
     * @returns 
     */
    function onFormSubmit(formData: CreateNameForm) {

        if (isDuplicateName(formData.name)) {
            alert("The name you inputted is already exists in one of the cashier lists below.");
            return;
        }
        
        const randomCashierIndex = Math.floor(Math.random() * 3);

        if (randomCashierIndex === 0) {
            setCashier1Names([...cashier1Names, {
                id: Math.random().toString(),
                name: formData.name,
            }]);
        } else if (randomCashierIndex === 1) {
            setCashier2Names([...cashier2Names, {
                id: Math.random().toString(),
                name: formData.name,
            }]);
        } else if (randomCashierIndex === 2) {
            setCashier3Names([...cashier3Names, {
                id: Math.random().toString(),
                name: formData.name,
            }]);
        }
        setIsAlertVisible(true);
        reset();

        const alertTimeout = setTimeout(() => {
            setIsAlertVisible(false);
        }, 2800);

        return () => clearTimeout(alertTimeout);
    }

    function handleCashier1() {
        if (cashier1Names.length > 0) {
            setCashier1Names(cashier1Names.slice(1));
        }
    }

    function handleCashier2() {
        if (cashier2Names.length > 0) {
            setCashier2Names(cashier2Names.slice(1));
        }
    }

    function handleCashier3() {
        if (cashier3Names.length > 0) {
            setCashier3Names(cashier3Names.slice(1));
        }
    }

    function deleteRow1() {
        if (cashier1Names.length > 0) {
            setCashier1Names(cashier1Names.slice(1));
        }
        if (cashier2Names.length > 0) {
            setCashier2Names(cashier2Names.slice(1));
        }
        if (cashier3Names.length > 0) {
            setCashier3Names(cashier3Names.slice(1));
        }
    }

    function deleteRow2() {
        if (cashier1Names.length > 1) {
            const newCashier1Names = [...cashier1Names];
            newCashier1Names.splice(1, 1);
            setCashier1Names(newCashier1Names);
        }
        if (cashier2Names.length > 1) {
            const newCashier2Names = [...cashier2Names];
            newCashier2Names.splice(1, 1);
            setCashier2Names(newCashier2Names);
        }
        if (cashier3Names.length > 1) {
            const newCashier3Names = [...cashier3Names];
            newCashier3Names.splice(1, 1);
            setCashier3Names(newCashier3Names);
        }
    }

    function deleteRow3() {
        if (cashier1Names.length > 2) {
            const newCashier1Names = [...cashier1Names];
            newCashier1Names.splice(2, 1);
            setCashier1Names(newCashier1Names);
        }
        if (cashier2Names.length > 2) {
            const newCashier2Names = [...cashier2Names];
            newCashier2Names.splice(2, 1);
            setCashier2Names(newCashier2Names);
        }
        if (cashier3Names.length > 2) {
            const newCashier3Names = [...cashier3Names];
            newCashier3Names.splice(2, 1);
            setCashier3Names(newCashier3Names);
        }
    }

    return <Space direction="vertical" size={"middle"} style={{ display: 'flex' }}>
        <Row>
            <Col span={24}>
                <h1>Fill in the form below to create a new name.</h1>
            </Col>
        </Row>

        {isAlertVisible &&
            <Row>
                <Col span={24}>
                    <Alert
                        message="The name you inputted has been created successfully!"
                        type="success"
                        closable
                        onClose={() => setIsAlertVisible(false)}
                    />
                </Col>
            </Row>
        }

        <Row>
            <Col span={24}>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <Space direction="vertical" size={"small"} style={{ display: 'flex' }}>

                        <Row>
                            <Col span={24}>
                                <Controller name="name"
                                    control={control}
                                    render={({ field }) => <Input id="name" placeholder="Person Name"
                                        addonBefore="Person Name" {...field} style={{ width: '600px' }} />} />
                                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                            </Col>
                        </Row>

                        <Button type="primary" htmlType="submit" className="bg-blue-500" >Enter Line</Button>

                        <div style={deleteRowContainerStyle}>
                            <div style={deleteRowStyle} onClick={deleteRow1}>
                                Delete Row 1
                            </div>
                            <div style={deleteRowStyle} onClick={deleteRow2}>
                                Delete Row 2
                            </div>
                            <div style={deleteRowStyle} onClick={deleteRow3}>
                                Delete Row 3
                            </div>
                        </div>

                        <div style={handleCashierContainerStyle}>
                            <div style={handleCashierStyle} onClick={handleCashier1}>
                                Handle Cashier #1
                            </div>
                            <div style={handleCashierStyle} onClick={handleCashier2}>
                                Handle Cashier #2
                            </div>
                            <div style={handleCashierStyle} onClick={handleCashier3}>
                                Handle Cashier #3
                            </div>
                        </div>
                    </Space>
                </form>
            </Col>
        </Row>
    </Space>
}

const DisplayQueue: React.FC = () => {

    const [cashier1Names] = useAtom(cashier1Atom);
    const [cashier2Names] = useAtom(cashier2Atom);
    const [cashier3Names] = useAtom(cashier3Atom);


    const calculateFontSize = (nameLength) => {
        const minFontSize = 10;
        const maxFontSize = 18;
        const fontSize = Math.max(minFontSize, maxFontSize - nameLength);
        return fontSize;
    };

    const renderCircles = (names: NameData[]): JSX.Element[] => {
        const circles: JSX.Element[] = [];
    
        for (let i = 0; i < Math.min(3, names.length); i++) {
            const nameData = names[i];
            if (nameData) {
                const fontSize = calculateFontSize(nameData.name.length);
                circles.push(
                    <div key={nameData.id} style={{ ...circleStyle, fontSize: `${fontSize}px` }}>
                        {nameData.name}
                    </div>
                );
            }
        }

        if (names.length > 3) {
            const moreCount = names.length - 3;
            circles.push(
                <div key="more" style={{ ...circleStyle, fontSize: '12px' }}>
                    ..{moreCount} more persons
                </div>
            );
        }
    
        return circles; 
    };
    

    return <>
        <div style={containerStyle}>
            <div style={cashierContainerStyle}>
                <div style={boxStyle}>
                    <h2>Cashier 1</h2>
                </div>
                <div>
                    {renderCircles(cashier1Names)}
                </div>
            </div>

            <div style={cashierContainerStyle}>
                <div style={boxStyle}>
                    <h2>Cashier 2</h2>
                </div>
                <div>
                    {renderCircles(cashier2Names)}
                </div>
            </div>

            <div style={cashierContainerStyle}>
                <div style={boxStyle}>
                    <h2>Cashier 3</h2>
                </div>
                <div>
                    {renderCircles(cashier3Names)}
                </div>
            </div>
        </div>
    </>
}

const deleteRowContainerStyle = {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: '10px',
};

const deleteRowStyle = {
    width: '150px', 
    height: '40px', 
    backgroundColor: 'gray',
    borderRadius: '10px', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    margin: '0 165px', 
    cursor: 'pointer',
};

const containerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '20px',
};

const cashierContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 10px', 
};

const boxStyle = {
    width: '100px',
    height: '50px',
    backgroundColor: 'lightgray',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid black',
};

const circleStyle = {
    width: '50px',
    height: '50px',
    backgroundColor: 'blue',
    borderRadius: '50%',
    margin: '10px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
};

const handleCashierContainerStyle = {
    display: 'flex', 
    justifyContent: 'space-around', 
    marginTop: '20px' 
};

const handleCashierStyle = {
    width: '150px', 
    height: '40px', 
    backgroundColor: 'gray',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    cursor: 'pointer',
};


// CreateNamePage.layout = WithDefaultLayout;
export default CreateNamePage;

