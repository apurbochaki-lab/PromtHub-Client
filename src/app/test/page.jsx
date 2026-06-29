'use client'


import { Button } from "@heroui/react";
import { ModalFormCreator } from "../../components/Common/ModalFormCreator";
import RejectPromptModal from "./RejectPromptModal";
import { RejectedModal } from "./RejectedModal";

const ModalPage = () => {
    return (
        <div className="min-h-screen">
            <h2 className="text-white text-center py-5 text-3xl ">Test a modal</h2>

            <div>
                
                <ModalFormCreator/>

                <RejectPromptModal/>

                <RejectedModal/>
            </div>
        </div>
    );
};

export default ModalPage;