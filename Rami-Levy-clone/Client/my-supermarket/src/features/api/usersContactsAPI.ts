import axios from "axios";


export const addNewUserContactAPI = async ( contact_name: string, contact_phone_number: string) => {
    try {
        debugger;
        const response = await axios.post('/api/users-contacts/add-new-user-contact', {  contact_name, contact_phone_number  });
        const { ok, insertId } = response.data;
        if (!ok) {
            throw new Error('Invalid credentials addNewUserContact()');
        }
        alert('איש קשר עודכן בהצלחה!');
        return insertId;
    } catch (error) {
        console.error('Error addNewUserContact:', error);
        throw error;
    }
}