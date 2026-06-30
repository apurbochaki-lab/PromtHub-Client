"use client";

import { CircleXmark } from "@gravity-ui/icons";
import { Button, Label, Modal, TextArea } from "@heroui/react";

export function RejectedModal() {
    return (
        <Modal>
            <Button variant="secondary">Open Modal</Button>

            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-[360px] bg-[#07381a]">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <div className="flex items-center gap-2">
                                <Modal.Icon className="bg-default text-foreground">
                                    <CircleXmark className="size-5" color="red" />
                                </Modal.Icon>
                                <Modal.Heading className="text-white">Rejection Feedback</Modal.Heading>
                            </div>
                        </Modal.Header>
                        <Modal.Body>
                            <p className="text-white">
                                Providing actionable feedback for Creator promt 2 [APURBO] helps creators refine prompt templates.
                            </p>


                            <form>
                                <div className="flex flex-col gap-2 mt-5">
                                    <Label htmlFor="textarea-rows-3" className="text-white">Feedback description *</Label>
                                    <TextArea
                                        className="bg-black/50 text-white"
                                        aria-label="Short feedback"
                                        id="textarea-rows-3"
                                        placeholder="Explain why this prompt was rejected (e.g. Broken links, poor grammar, duplicate topic)..."
                                        rows={3}
                                    />
                                </div>

                                <Modal.Footer className="mt-7">
                                    <Button variant="outline" className="w-full font-bold text-white" slot="close">
                                        Cancel
                                    </Button>

                                    <Button variant="danger" className="w-full font-bold" slot="close">
                                        Submit Rejection
                                    </Button>
                                </Modal.Footer>
                            </form>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}