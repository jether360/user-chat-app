import { action, makeAutoObservable, observable } from "mobx";
import { ReactNode } from "react";
import { IModal } from "../models/modal";

export default class ModalStore {
    modal: IModal = {} as IModal;

    constructor() {
        makeAutoObservable(this, {
            //observable
            modal: observable,
            //action
            showModal: action,
            closeModal: action
        })
    }

    showModal = (body: ReactNode, width?: number) => {
        this.modal.show = true;
        this.modal.body = body;

        console.log(body)
       // debugger;
        if (width)
            this.modal.width = width;
        else this.modal.width = 0;
    }

    closeModal = () => {
        this.modal.show = false;
        this.modal.body = null;
    }
}