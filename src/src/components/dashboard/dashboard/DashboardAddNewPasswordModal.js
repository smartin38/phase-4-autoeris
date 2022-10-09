import { Modal, Input, Button, Textarea } from "react-daisyui";

function DashboardAddNewPasswordModal({ handleToogleAddNewNote, handleAddNewPassword, name, setName, note, setNote, feelingId, setFeelingId, feelings}) {
    const handleChange = event => {
      console.log(event.target.value);
      setFeelingId(event.target.value);
    };
    
    return (
        <Modal open={handleToogleAddNewNote} onClickBackdrop={handleToogleAddNewNote}>
            <Modal.Header className="font-bold">
                Add New Note
            </Modal.Header>
        
            <Modal.Body className="items-center text-center">
                <div className="space-y-6">
                    <Input value={name} onChange={(e) => setName(e.target.value)} className="w-full text-sm text-white px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-400" type="text" placeholder="name"></Input>
                    <Textarea value={note} onChange={(e) => setNote(e.target.value)} className="w-full text-sm text-white px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-400" type="text" placeholder="Content"></Textarea>
                    <Button onClick={handleAddNewPassword} type="submit" className="w-full flex justify-center bg-purple-800  hover:bg-purple-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500">
                        Add New Note
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default DashboardAddNewPasswordModal;