"use client";

import { Rocket } from "@gravity-ui/icons";
import { Button, Label, Modal, TextArea } from "@heroui/react";

export function RejectedModal() {
    return (
        <Modal>
            <Button variant="secondary">Open Modal</Button>
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-[360px]">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-default text-foreground">
                                <Rocket className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>Welcome to HeroUI</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body>
                            <p>
                                A beautiful, fast, and modern React UI library for building accessible and
                                customizable web applications with ease.
                            </p>


                            <form>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="textarea-rows-3">Short feedback</Label>
                                    <TextArea
                                        aria-label="Short feedback"
                                        id="textarea-rows-3"
                                        placeholder="This week's highlights..."
                                        rows={3}
                                    />
                                </div>
                            </form>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="w-full" slot="close">
                                Continue
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}