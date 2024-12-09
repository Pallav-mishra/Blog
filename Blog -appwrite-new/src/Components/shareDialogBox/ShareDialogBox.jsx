import { Fragment, useContext, useState } from "react";
import {
    Dialog,
    DialogBody,
} from "@material-tailwind/react";
import myContext from "../../context/data/myContext";
import { AiOutlineShareAlt, AiFillLinkedin, AiFillInstagram, AiFillGithub, AiFillFacebook } from 'react-icons/ai';
import "./ShareDialogBox.css";

export default function ShareDialogBox() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const context = useContext(myContext);
    const { mode } = context;

    return (
        <Fragment>
            <div className="share-icon-container">
                <AiOutlineShareAlt
                    onClick={handleOpen}
                    className="share-icon"
                    style={{ color: mode === 'dark' ? 'white' : 'white' }}
                    size={20}
                />
            </div>
            
            <Dialog
                className="dialog-box"
                open={open}
                handler={handleOpen}
                style={{
                    background: mode === 'light' ? '#2f3542' : '#2f3542',
                    color: mode === 'dark' ? 'white' : 'black',
                }}
            >
               =
                <DialogBody>
                    <div className="icon-container">
                        =
                        <a href="https://www.linkedin.com" className="icon">
                            <AiFillLinkedin size={35} />
                        </a>
                       =
                        <a href="https://www.instagram.com" className="icon">
                            <AiFillInstagram size={35} />
                        </a>
                        =
                        <a href="https://github.com/" className="icon">
                            <AiFillGithub size={35} />
                        </a>
                        =
                        <a href="https://www.facebook.com" className="icon">
                            <AiFillFacebook size={35} />
                        </a>
                    </div>
                </DialogBody>
            </Dialog>
        </Fragment>
    );
}
