import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes, FaPlus } from "react-icons/fa";

const DoctorSchedules = () => {
  const todayString = new Date().toISOString().split("T")[0];

  const [schedules, setSchedules] = useState([]);
  const [activeDate, setActiveDate] = useState(todayString);
  const [slots, setSlots] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [newSlot, setNewSlot] = useState("");
  const [editError, setEditError] = useState("");
  const [addError, setAddError] = useState("");

  // ---------------- Mock API ----------------
  const fetchSchedules = async () => {
    const data = [
      { date: todayString, slots: ["10:00", "11:30"] },
      { date: "2025-11-27", slots: ["09:00", "13:15"] },
    ];
    setSchedules(data);
    const todaySlots = data.find((s) => s.date === todayString);
    setSlots(todaySlots ? [...todaySlots.slots] : []);
  };

  const updateSchedulesAPI = async (updated) => {
    console.log("API UPDATE → ", updated);
    return new Promise((res) => setTimeout(res, 300));
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleDateChange = (date) => {
    setActiveDate(date);
    const existing = schedules.find((s) => s.date === date);
    setSlots(existing ? [...existing.slots] : []);
    setEditIndex(null);
    setEditValue("");
    setNewSlot("");
    setEditError("");
    setAddError("");
  };

  const startEdit = (index, value) => {
    setEditIndex(index);
    setEditValue(value);
    setEditError("");
  };

  const saveSlot = async () => {
    const trimmedValue = editValue.trim();
    if (!trimmedValue) {
      setEditError("Time cannot be empty!");
      return;
    }
    if (slots.some((s, i) => s === trimmedValue && i !== editIndex)) {
      setEditError("This time slot already exists!");
      return;
    }
    const updatedSlots = [...slots];
    updatedSlots[editIndex] = trimmedValue;
    await saveToAPI(updatedSlots);
    setSlots(updatedSlots);
    setEditIndex(null);
    setEditValue("");
    setEditError("");
  };

  const deleteSlot = async (index) => {
    const updatedSlots = slots.filter((_, i) => i !== index);
    await saveToAPI(updatedSlots);
    setSlots(updatedSlots);
    setEditError("");
    setAddError("");
  };

  const addNewSlot = async () => {
    if (!newSlot) {
      setAddError("Time cannot be empty!");
      return;
    }
    if (slots.includes(newSlot)) {
      setAddError("This time slot already exists!");
      return;
    }
    const updatedSlots = [...slots, newSlot].sort();
    await saveToAPI(updatedSlots);
    setSlots(updatedSlots);
    setNewSlot("");
    setAddError("");
  };

  const saveToAPI = async (updatedSlots) => {
    const existing = schedules.filter((s) => s.date !== activeDate);
    const updatedSchedules = [
      ...existing,
      { date: activeDate, slots: updatedSlots },
    ];
    await updateSchedulesAPI(updatedSchedules);
    setSchedules(updatedSchedules);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-linear-to-b from-[#0A1F44] to-[#07133B] px-4 py-8">
      <div className="w-full max-w-3xl rounded-2xl bg-[#0B1A3A] p-6 shadow-2xl ring-1 ring-sky-600">
        <h1 className="mb-6 text-center text-2xl font-bold text-sky-300 sm:text-3xl">
          Doctor Schedules
        </h1>
        <hr className="mb-5" />

        <div className="mb-6 flex justify-center">
          <input
            type="date"
            min={todayString}
            value={activeDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className="w-48 rounded-lg border border-sky-500 bg-[#07133B] px-4 py-2 text-center text-lg font-semibold text-white shadow-md transition duration-300 focus:border-sky-400 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>

        {activeDate && (
          <table className="w-full border-collapse rounded-xl bg-[#0B1A3A] text-left text-white shadow-lg">
            <thead>
              <tr className="bg-[#07133B] text-sky-300 md:text-left">
                <th className="p-4 text-sm font-semibold sm:text-base">Slot</th>
                <th className="p-4 text-center text-sm font-semibold sm:text-base">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {slots.length === 0 && (
                <tr>
                  <td
                    colSpan={2}
                    className="p-4 text-center text-gray-400 italic"
                  >
                    No slots for this date
                  </td>
                </tr>
              )}

              {slots.map((slot, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-700 transition hover:bg-slate-800"
                >
                  <td className="flex flex-col p-4">
                    {editIndex === index ? (
                      <>
                        <input
                          type="time"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="rounded-lg bg-slate-800 px-2 py-1 text-white accent-sky-400"
                        />
                        {editError && (
                          <span className="mt-1 text-sm text-red-400">
                            {editError}
                          </span>
                        )}
                      </>
                    ) : (
                      slot
                    )}
                  </td>
                  <td>
                    {editIndex === index ? (
                      <div className="flex justify-center gap-2">
                        {/* Save */}
                        <button
                          title="Save"
                          onClick={saveSlot}
                          className="flex items-center justify-center rounded bg-green-600 px-2 py-1 text-white hover:bg-green-500 sm:px-3 sm:py-1 sm:text-sm"
                        >
                          <span className="sm:hidden">
                            <FaCheck />
                          </span>
                          <span className="hidden sm:inline">Save</span>
                        </button>

                        {/* Cancel */}
                        <button
                          title="Cancel"
                          onClick={() => {
                            setEditIndex(null);
                            setEditValue("");
                            setEditError("");
                          }}
                          className="flex items-center justify-center rounded bg-gray-600 px-2 py-1 text-white hover:bg-gray-500 sm:px-3 sm:py-1 sm:text-sm"
                        >
                          <span className="sm:hidden">
                            <FaTimes />
                          </span>
                          <span className="hidden sm:inline">Cancel</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-center gap-2">
                        {/* Edit */}
                        <button
                          title="Edit"
                          onClick={() => startEdit(index, slot)}
                          className="flex items-center justify-center rounded bg-sky-600 px-2 py-1 text-white hover:bg-sky-500 sm:px-3 sm:py-1 sm:text-sm"
                        >
                          <span className="sm:hidden">
                            <FaEdit />
                          </span>
                          <span className="hidden sm:inline">Edit</span>
                        </button>

                        {/* Delete */}
                        <button
                          title="Delete"
                          onClick={() => deleteSlot(index)}
                          className="flex items-center justify-center rounded bg-red-600 px-2 py-1 text-white hover:bg-red-500 sm:px-3 sm:py-1 sm:text-sm"
                        >
                          <span className="sm:hidden">
                            <FaTrash />
                          </span>
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}

              {/* Add New Slot Row */}
              {/* Add Time Slot Header */}
              <tr>
                <td
                  colSpan={2} // spans both columns
                  className="px-4 py-6 text-2xl font-bold text-white"
                >
                  Add Time Slot
                </td>
              </tr>
              {activeDate && (
                <tr className="border-t border-slate-700">
                  <td className="flex flex-col py-3">
                    <input
                      type="time"
                      value={newSlot}
                      onChange={(e) => setNewSlot(e.target.value)}
                      className="rounded-lg bg-slate-800 px-2 py-1 text-white accent-sky-400"
                    />
                    {addError && (
                      <span className="mt-1 text-sm text-red-400">
                        {addError}
                      </span>
                    )}
                  </td>
                  <td className="flex flex-wrap gap-2">
                    {/* Add */}
                    <button
                      title="Add"
                      onClick={addNewSlot}
                      className="flex items-center rounded bg-green-600 px-2 py-1 text-sm text-white hover:bg-green-500 sm:px-3 sm:py-1 sm:text-sm"
                    >
                      <span className="sm:hidden">
                        <FaPlus />
                      </span>
                      <span className="text-md px-3 py-1 font-bold sm:inline">
                        Add
                      </span>
                    </button>

                    {/* Clear */}
                    {newSlot && (
                      <button
                        title="Clear"
                        onClick={() => setNewSlot("")}
                        className="flex items-center justify-center rounded bg-gray-600 px-2 py-1 text-white hover:bg-gray-500 sm:px-3 sm:py-1 sm:text-sm"
                      >
                        <span className="sm:hidden">
                          <FaTimes />
                        </span>
                        <span className="hidden sm:inline">Clear</span>
                      </button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DoctorSchedules;
