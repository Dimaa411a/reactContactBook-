
function ContactsInfo () {
    return (
        <section className="contact-details">
            <header>
                <div className="profile">
                    <div className="avatar-mn">MN</div>
                    <div className="user-info">
                        <h1>Maria Novak</h1>
                        <span>Added Mar 14. avatar:initials fallback</span>
                    </div>
                </div>
                <div className="action-btns">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                </div>

                <form className="input-fields">
                    <div className="field">
                        <span className="label">PHONE:</span>
                        <span className="phone-field">+1 (312) 555-0146</span>
                    </div>

                    <div className="field">
                        <span className="label">EMAIL:</span>
                        <span className="email-field">maria.novak@fastmail.com</span>
                    </div>

                    <div className="field">
                        <span className="label">NOTE:</span>
                        <span className="note-field">
                            Study group partner — prefers texts over calls. Met at the Week 3 workshop.
                        </span>
                    </div>
                </form>
            </header>
        </section>
    )
}

export default ContactsInfo