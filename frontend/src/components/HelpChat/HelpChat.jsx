import './HelpChat.css';
import { useRef, useState, useContext, useEffect } from 'react';
import { TheContext } from '../../App';

const HelpChat = () => {
    const writeAQuestion = useRef();
    const { localDataBank, dispatch } = useContext(TheContext);
    const [chat, setChat] = useState();

    const showWriteQuest = (event) => {
        event.preventDefault();
        writeAQuestion.current.style.display = 'flex';
    };

    const sendQuest = async (event) => {
        event.preventDefault();

        const question = event.target.previousSibling.value;
        console.log(question);
        

        const res = await fetch(`http://localhost:3000/help-chat/${localDataBank.user._id}`, {
            method: 'POST',
            body: JSON.stringify({ question }),
            headers: { 'content-type': 'application/json' }
        });
    };

    const getChat = async () => {
        const res = await fetch(`http://localhost:3000/help-chat/${localDataBank.user._id}`);
        const data = await res.json();
        console.log(data);

        setChat(data.helpChat.chat);
    };

    useEffect(() => {
        getChat();
    }, []);

    useEffect(() => {
        console.log('chat', chat);
    }, [chat]);

    return (
        <form className="help-chat">
            Help Chat

            <span>How can I help you</span>

            <div>
                <button>1. Option</button>
                <button>2. Option</button>
                <button onClick={showWriteQuest}>Ask Personal</button>
            </div>

            <div className='write-a-question' ref={writeAQuestion}>
                <span>Write a question:</span>
                <input type="text" />
                <button onClick={sendQuest}>Send</button>
            </div>
            
            <div>
                {
                    chat && chat.map(message => (
                        <div key={message._id}>
                            {message.message}
                        </div>
                    ))
                }
            </div>
        </form>
    );
};

export default HelpChat;