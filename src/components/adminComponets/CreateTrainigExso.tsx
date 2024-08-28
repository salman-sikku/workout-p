import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Interactio {
  interaction: string;
}

interface Mistake {
  mistake: string;
}

interface Brathing {
  tips: string;
}

interface FormData {
  name: string;
  category: string;
  interactions: Interactio[];
  mistakes: Mistake[];
  brathings: Brathing[];
  imgUrl: string;
  focusImg?: string;
  focusArea: string[];
  duration: number;
  reps: number;
}

type ArrayKeys = 'interactions' | 'mistakes' | 'brathings';

const CreateTrainigExso: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: '',
    interactions: [{ interaction: '' }],
    mistakes: [{ mistake: '' }],
    brathings: [{ tips: '' }],
    imgUrl: '',
    focusImg: '',
    focusArea: [],
    duration: 0,
    reps: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleArrayChange = (index: number, e: ChangeEvent<HTMLInputElement>, key: ArrayKeys) => {
    const { name, value } = e.target;
    const updatedArray = formData[key].map((item, i) => (
      i === index ? { ...item, [name]: value } : item
    ));
    setFormData({ ...formData, [key]: updatedArray });
  };

  const handleAddField = (key: ArrayKeys) => {
    setFormData({ ...formData, [key]: [...formData[key], { [key.slice(0, -1)]: '' }] });
  };

  const handleRemoveField = (index: number, key: ArrayKeys) => {
    const updatedArray = formData[key].filter((_, i) => i !== index);
    setFormData({ ...formData, [key]: updatedArray });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/train-exercise/trainPost', formData);
      toast.success(response.data.massage);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Training Exercise Form</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      {formData.interactions.map((interaction, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700">Interaction</label>
          <input
            type="text"
            name="interaction"
            value={interaction.interaction}
            onChange={(e) => handleArrayChange(index, e, 'interactions')}
            placeholder="Interaction"
            required
            className="w-full px-3 py-2 border rounded-md"
          />
          <button
            type="button"
            onClick={() => handleRemoveField(index, 'interactions')}
            className="mt-2 text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => handleAddField('interactions')}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Add Interaction
      </button>
      
      {formData.mistakes.map((mistake, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700">Mistake</label>
          <input
            type="text"
            name="mistake"
            value={mistake.mistake}
            onChange={(e) => handleArrayChange(index, e, 'mistakes')}
            placeholder="Mistake"
            required
            className="w-full px-3 py-2 border rounded-md"
          />
          <button
            type="button"
            onClick={() => handleRemoveField(index, 'mistakes')}
            className="mt-2 text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => handleAddField('mistakes')}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Add Mistake
      </button>
      
      {formData.brathings.map((brathing, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700">Breathing Tips</label>
          <input
            type="text"
            name="tips"
            value={brathing.tips}
            onChange={(e) => handleArrayChange(index, e, 'brathings')}
            placeholder="Breathing Tips"
            required
            className="w-full px-3 py-2 border rounded-md"
          />
          <button
            type="button"
            onClick={() => handleRemoveField(index, 'brathings')}
            className="mt-2 text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => handleAddField('brathings')}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Add Breathing Tips
      </button>
      
      <div className="mb-4">
        <label className="block text-gray-700">Image URL</label>
        <input
          type="text"
          name="imgUrl"
          value={formData.imgUrl}
          onChange={handleChange}
          placeholder="Image URL"
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Focus Image URL</label>
        <input
          type="text"
          name="focusImg"
          value={formData.focusImg}
          onChange={handleChange}
          placeholder="Focus Image URL"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Focus Area (comma separated)</label>
        <input
          type="text"
          name="focusArea"
          value={formData.focusArea.join(',')}
          onChange={(e) => setFormData({ ...formData, focusArea: e.target.value.split(',') })}
          placeholder="Focus Area"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Duration</label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Duration"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Reps</label>
        <input
          type="number"
          name="reps"
          value={formData.reps}
          onChange={handleChange}
          placeholder="Reps"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
        Submit
      </button>
    </form>
  );
};

export default CreateTrainigExso;
