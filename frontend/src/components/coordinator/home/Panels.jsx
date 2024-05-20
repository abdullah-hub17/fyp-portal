import React, { useState } from "react";
import Modal from "react-modal";
import "../coordinatorstylings/Selectpanelmembers.css";

const Panels = () => {
  const [panelName, setPanelName] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [panels, setPanels] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedFypGroupId, setSelectedFypGroupId] = useState("");

  const [fypGroups, setFypGroups] = useState([
    {
      id: 1,
      name: "FYP Group 1",
      selected: false,
    },
    {
      id: 2,
      name: "FYP Group 2",
      selected: false,
    },
  ]);

  const [facultyMembers, setFacultyMembers] = useState([
    {
      id: 1,
      name: "John Doe",
      designation: "Professor",
      email: "john@example.com",
    },
    {
      id: 2,
      name: "Jane Doe",
      designation: "Assistant Professor",
      email: "jane@example.com",
    },
  ]);

  const handlePanelNameChange = (e) => {
    setPanelName(e.target.value);
  };

  const handleMemberSelection = () => {
    if (selectedMember) {
      const member = facultyMembers.find(
        (m) => m.id === parseInt(selectedMember)
      );
      setSelectedMembers((prevMembers) => [...prevMembers, member]);
      setSelectedMember("");
    }
  };

  const handleAssignFypGroup = () => {
    if (selectedFypGroupId && selectedMembers.length > 0) {
      const selectedGroup = fypGroups.find(
        (group) => group.id === parseInt(selectedFypGroupId)
      );
      if (selectedGroup) {
        selectedGroup.panels.push({
          name: panelName,
          members: [...selectedMembers],
        });
        setFypGroups((prevGroups) => [...prevGroups]);
        setPanelName("");
        setSelectedMembers([]);
        setSelectedFypGroupId("");
      }
    }
  };

  const handleRemoveMember = (memberId) => {
    setSelectedMembers((prevMembers) =>
      prevMembers.filter((m) => m.id !== memberId)
    );
  };

  const handleCreatePanel = () => {
    if (panelName && selectedMembers.length > 0) {
      const newPanel = { name: panelName, members: [...selectedMembers] };
      setPanels((prevPanels) => [...prevPanels, newPanel]);
      setPanelName("");
      setSelectedMembers([]);
    }
  };

  const handleShowMembers = (panelName) => {
    setActiveModal(panelName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="container-three">
      <h1 className="title-three">Create Panels</h1>
      <form className="inner-three">
        <label className="list-three">
          <span className="label-three">Panel Name:</span>
          <input
            type="text"
            className="input-three"
            value={panelName}
            onChange={handlePanelNameChange}
          />
        </label>
        <br />

        <label className="list-three">
          <span className="label-three">Panel Members:</span>
          <select
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
          >
            <option value="">Select a member</option>
            {facultyMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="inner-button"
            onClick={handleMemberSelection}
          >
            Select
          </button>
        </label>
        <br />
        <label className="list-three">
          <span className="label-three">Select FYP Groups:</span>
          <select
            value={selectedFypGroupId}
            onChange={(e) => setSelectedFypGroupId(e.target.value)}
          >
            <option value="">Select a group</option>
            {fypGroups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="inner-button"
            onClick={handleAssignFypGroup}
          >
            Assign
          </button>
        </label>
        <br />

        <div className="list-three">
          <h3>Selected Members:</h3>
          <ul>
            {selectedMembers.map((member) => (
              <li key={member.id}>
                {member.name} ({member.designation}) - {member.email}
                <button
                  type="button"
                  className="inner-button"
                  onClick={() => handleRemoveMember(member.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="inner-button"
          onClick={handleCreatePanel}
        >
          Create Panel
        </button>
      </form>

      <div className="inner-new">
        <h2 className="title-new">List of Created Panels</h2>
        <ul>
          {panels.map((panel) => (
            <li key={panel.name} className="list-three">
              {panel.name}
              <button
                type="button"
                className="inner-button"
                onClick={() => handleShowMembers(panel.name)}
              >
                Show Members
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Modals for Displaying Panel Members */}
      {panels.map((panel) => (
        <Modal
          key={panel.name}
          isOpen={activeModal === panel.name}
          onRequestClose={closeModal}
          contentLabel={`Panel Members - ${panel.name}`}
        >
          <h2>{panel.name} Members</h2>
          <ul>
            {panel.members.map((member) => (
              <li key={member.id}>
                {member.name} ({member.designation}) - {member.email}
              </li>
            ))}
          </ul>
          <button onClick={closeModal} className="inner-button">
            Close
          </button>
        </Modal>
      ))}
    </div>
  );
};

export default Panels;
