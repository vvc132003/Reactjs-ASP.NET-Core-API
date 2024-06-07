import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';
import $ from 'jquery';
import { NavLink } from 'react-router-dom'; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPaperclip, faBell, faTimesCircle, faBellSlash, faLocationArrow, faVideo, faPhone, faEllipsisV, faUserCircle, faUsers, faPlus, faBan } from '@fortawesome/free-solid-svg-icons';
import { DanhSachCuocTroChuyen } from '../../services/Chat';
import { useParams } from 'react-router-dom';

const Chat = () => {
    const [showAdditionalContent, setShowAdditionalContent] = useState(false);
    const [chatColumnClass, setChatColumnClass] = useState('col-10 col-xl-9');
    const [conversationList, setConversationList] = useState([]);
    const { cuochoithoaiid } = useParams();
    const [userInfo, setUserInfo] = useState(null);
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        $('#action_menu_btn').click(function () {
            $('.action_menu').toggle();
        });
    }, []);

    useEffect(() => {
        setChatColumnClass(showAdditionalContent ? 'col-6 ' : 'col-10 col-xl-9');
    }, [showAdditionalContent]);

    const handleViewProfileClick = () => {
        setShowAdditionalContent(!showAdditionalContent);
        $('.action_menu').hide(); // Ẩn action_menu khi click vào View profile

    };
    useEffect(() => {
        const userInfoData = JSON.parse(sessionStorage.getItem('user'));
        setUserInfo(userInfoData);
    }, []);
    useEffect(() => {
        if (cuochoithoaiid) {
            conversationLists();
        }
    }, [cuochoithoaiid]);

    const conversationLists = async () => {
        try {
            const userInfo = JSON.parse(sessionStorage.getItem('user'));
            if (!userInfo || !userInfo.id) {
                console.error("User information not found in sessionStorage.");
                return;
            }
            const response = await DanhSachCuocTroChuyen(userInfo.id, cuochoithoaiid);
            if (response) {
                const { danhsachtrochuyen, danhsachtinnhan } = response;
                setConversationList(danhsachtrochuyen);
                setMessages(danhsachtinnhan);
                console.log("Conversation list:", danhsachtinnhan);
            }
        } catch (error) {
            console.error("Error fetching conversation list:", error);
        }
    };


    const cuochoithoai = () => {
        return (
            <div className="card-body contacts_body">
                <ul className="contacts">
                    {conversationList.map((conversation, index) => (
                        <NavLink
                            key={index}
                            to={{
                                pathname: `/chat/${conversation.cuochoithoaiids}`,
                            }}
                            className={index === 0 ? "active nav-link" : "nav-link"}
                        >
                            <li>
                                <div className="d-flex bd-highlight">
                                    <div className="img_cont">
                                        <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" className="rounded-circle user_img" />
                                        {/* {conversation.avatar && <img src={conversation.avatar} className="rounded-circle user_img" alt="user" />} */}
                                        <span className="online_icon"></span>
                                        {/* <span className={`online_icon ${conversation.status === 'online' ? 'online' : ''}`}></span> */}
                                    </div>
                                    <div className="user_info">
                                        <span>{conversation.ten}</span>
                                        <p>{conversation.noiDungTinNhan}</p>
                                    </div>
                                </div>
                            </li>
                        </NavLink>
                    ))}
                </ul>
            </div>
        )
    }

    const tinnhan = () => {
        return (
            <div className="card-body msg_card_body">
                {messages.map((message, index) => (
                    userInfo && message.nhanVienGuiId === userInfo.id ? (
                        <div key={index} className="d-flex justify-content-end mb-4">
                            <div className="msg_cotainer_send">
                                {message.noiDung}
                                <span className="msg_time_send">{message.thoiGianNhan}</span>
                            </div>
                            <div className="img_cont_msg">
                                <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" className="rounded-circle user_img_msg" alt="user" />
                            </div>
                        </div>
                    ) : (
                        <div key={index} className="d-flex justify-content-start mb-4">
                            <div className="img_cont_msg">
                                <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" className="rounded-circle user_img_msg" alt="user" />
                            </div>
                            <div className="msg_cotainer">
                                {message.noiDung}
                                <span className="msg_time">{message.thoiGianNhan}</span>
                            </div>
                        </div>
                    )
                ))}
            </div>
        )
    };

    return (
        <div className="row  ">
            <div className="col-2 col-xl-3 chat">
                <div className="card mb-sm-3 mb-md-0 contacts_card">
                    <div className="card-header">
                        <div className="input-group">
                            <input type="text" placeholder="Search..." name="" style={{ padding: '2px 16px' }} className="form-control search" />
                            <div className="input-group-prepend">
                                <span className="input-group-text search_btn"><FontAwesomeIcon icon={faSearch} /></span>
                            </div>
                        </div>
                    </div>
                    {cuochoithoai()}
                    <div className="card-footer"></div>
                </div>
            </div>
            <div className={`${chatColumnClass} chat`}>
                <div className="card">
                    <div className="card-header msg_head">
                        <div className="d-flex bd-highlight">
                            <div className="img_cont">
                                <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" className="rounded-circle user_img" alt="user" />
                                <span className="online_icon"></span>
                            </div>
                            <div className="user_info">
                                <span>Chat with jassa</span>
                                <p>1767 Messages</p>
                            </div>
                            <div className="video_cam">
                                <span><FontAwesomeIcon icon={faVideo} /></span>
                                <span><FontAwesomeIcon icon={faPhone} /></span>
                            </div>
                        </div>
                        <span id="action_menu_btn"><FontAwesomeIcon icon={faEllipsisV} /></span>
                        <div className="action_menu">
                            <ul>
                                <li onClick={handleViewProfileClick}><FontAwesomeIcon icon={faUserCircle} /> View profile</li>
                                <li><FontAwesomeIcon icon={faUsers} /> Add to close friends</li>
                                <li><FontAwesomeIcon icon={faPlus} /> Add to group</li>
                                <li><FontAwesomeIcon icon={faBan} /> Block</li>
                            </ul>
                        </div>
                    </div>
                    {tinnhan()}
                    <div className="card-footer">
                        <div className="input-group">
                            <div className="input-group-append">
                                <span style={{ padding: '1.375rem .75rem' }} className="input-group-text attach_btn"><FontAwesomeIcon icon={faPaperclip} /></span>
                            </div>
                            {/* Displaying userInfo.id */}
                            <textarea name="" className="form-control type_msg" placeholder="Type your message..."></textarea>
                            <div className="input-group-append">
                                <span style={{ padding: '1.375rem .75rem' }} className="input-group-text send_btn"><FontAwesomeIcon icon={faLocationArrow} /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showAdditionalContent && (
                <div className="col-4 col-xl-3 right-chat-sidebar">
                    <div className="card">
                        <div className="card-header-right">
                            <div className=" text-center">
                                <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" className="rounded-circle user_img" alt="user" />
                            </div>
                            <div className="text-center">
                                <h6>Chat with jassa</h6>
                                <span>Hoạt động 8 giờ trước</span>
                            </div>
                            <div className="card-header-right-icon text-center justify-content-center">
                                <div className="icon-options-vertical">
                                    <div>
                                        <FontAwesomeIcon icon={faUserCircle} />
                                        <span>Trang cá nhân</span>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon icon={faBell} />
                                        <span>Thông báo</span>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon icon={faSearch} />
                                        <span>Tìm kiếm</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default Chat;
