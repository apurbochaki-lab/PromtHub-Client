"use client";

import { CircleXmarkFill, PaperPlane } from "@gravity-ui/icons";
import { Button, Modal, TextArea } from "@heroui/react";

export default function RejectPromptModal() {
    return (
        <Modal>
            {/* Open Button */}
            <Button color="danger" variant="flat">
                Open Modal
            </Button>

            <Modal.Backdrop className="bg-black/60 backdrop-blur-sm">
                <Modal.Container>
                    <Modal.Dialog className="max-w-xl rounded-3xl border border-white/10 bg-[#0B1220] text-white">
                        <Modal.CloseTrigger />

                        {/* Header */}
                        <Modal.Header className="border-b border-white/10 pb-5">
                            <Modal.Icon className="bg-transparent text-white">
                                <CircleXmarkFill className="size-6" />
                            </Modal.Icon>

                            <Modal.Heading className="text-2xl font-bold">
                                Rejection Feedback
                            </Modal.Heading>
                        </Modal.Header>

                        {/* Body */}
                        <Modal.Body className="space-y-5 py-6">
                            <p className="text-sm leading-6 text-default-500">
                                Providing actionable feedback for{" "}
                                <span className="font-semibold text-white">
                                    Creator prompt [APURBO]
                                </span>{" "}
                                helps creators refine prompt templates.
                            </p>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold uppercase tracking-wide text-default-400">
                                    FEEDBACK DESCRIPTION *
                                </label>

                                <TextArea
                                    aria-label="Rejection Feedback"
                                    minRows={5}
                                    placeholder="Explain why this prompt was rejected (e.g. Broken links, poor grammar, duplicate topic)..."
                                    classNames={{
                                        inputWrapper:
                                            "bg-[#111827] border border-white/10 hover:border-white/20",
                                        input:
                                            "text-white placeholder:text-default-500",
                                    }}
                                />
                            </div>
                        </Modal.Body>

                        {/* Footer */}
                        <Modal.Footer className="justify-end gap-3 border-t border-white/10 pt-5">
                            <Button
                                slot="close"
                                variant="bordered"
                                className="min-w-28 border-white/10"
                            >
                                Cancel
                            </Button>

                            <Button
                                color="danger"
                                startContent={<PaperPlane className="size-4" />}
                                className="min-w-44"
                            >
                                Submit Rejection
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}