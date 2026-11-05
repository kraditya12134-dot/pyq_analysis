import React, { useState } from 'react';
import { CategoryItem, Quiz } from '../../types/quiz';
import { storageService } from '../../services/storageService';
import { Plus, Edit3, Trash2, Layers, BookOpen, X, CheckCircle2 } from 'lucide-react';

interface CategoriesPageProps {
  quizzes: Quiz[];
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ quizzes }) => {
  const [categories, setCategories] = useState<CategoryItem[]>(storageService.getCategories());
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<CategoryItem | null>(null);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  const openCreate = () => {
    setEditingCat(null);
    setName('');
    setCode('');
    setDescription('');
    setModalOpen(true);
  };

  const openEdit = (cat: CategoryItem) => {
    setEditingCat(cat);
    setName(cat.name);
    setCode(cat.code);
    setDescription(cat.description);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !code.trim()) return;

    const quizCount = quizzes.filter((q) => q.category.toLowerCase() === name.trim().toLowerCase()).length;

    const catToSave: CategoryItem = {
      id: editingCat ? editingCat.id : `cat-${Date.now()}`,
      name: name.trim(),
      code: code.trim().toUpperCase(),
      description: description.trim(),
      quizCount,
      iconName: 'BookOpen',
    };

    storageService.saveCategory(catToSave);
    setCategories(storageService.getCategories());
    setModalOpen(false);
    setMsg(editingCat ? 'Category updated.' : 'New category created.');
    setTimeout(() => setMsg(null), 2000);
  };

  const handleDelete = (id: string, catName: string) => {
    const hasQuizzes = quizzes.some((q) => q.category.toLowerCase() === catName.toLowerCase());
    if (hasQuizzes) {
      alert(`Cannot delete category "${catName}" because active assessments are assigned to it.`);
      return;
    }
    if (confirm(`Delete category "${catName}"?`)) {
      storageService.deleteCategory(id);
      setCategories(storageService.getCategories());
      setMsg('Category removed.');
      setTimeout(() => setMsg(null), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-2xl font-bold text-[#0B132B]">
            Subject Categories & Syllabus Tracks
          </h1>
          <p className="text-xs text-[#475569] mt-0.5">
            Organize examinations into accredited academic departments and topics
          </p>
        </div>

        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-[#4338CA] hover:bg-[#4F46E5] text-white font-semibold text-xs rounded transition-colors shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Academic Domain</span>
        </button>
      </div>

      {msg && (
        <div className="p-3 bg-[#ECFDF5] border border-[#A7F3D0] rounded text-xs text-[#059669] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{msg}</span>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => {
          const matchingQuizzes = quizzes.filter(
            (q) => q.category.toLowerCase() === cat.name.toLowerCase()
          );

          return (
            <div
              key={cat.id}
              className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#CBD5E1] transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#4338CA] bg-[#EEF2FF] px-2 py-0.5 rounded font-mono">
                    {cat.code}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEdit(cat)}
                      className="p-1 text-[#475569] hover:text-[#0B132B] hover:bg-[#F1F5F9] rounded"
                      title="Edit Category"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id, cat.name)}
                      className="p-1 text-[#DC2626] hover:bg-[#FEF2F2] rounded"
                      title="Delete Category"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#0B132B]">
                  {cat.name}
                </h3>

                <p className="text-xs text-[#475569] leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#475569]">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#4338CA]" />
                  <span className="tabular-nums font-semibold text-[#0B132B]">
                    {matchingQuizzes.length} Assessments
                  </span>
                </div>
                <span className="text-[10px] text-[#94A3B8] uppercase">
                  Accredited
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Category Creator / Editor */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-[#E2E8F0] rounded-xl max-w-md w-full shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-[#F1F5F9] flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#0B132B]">
                {editingCat ? 'Edit Subject Category' : 'Add Subject Category'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-[#475569] hover:bg-[#F1F5F9] rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Artificial Intelligence & Robotics"
                  className="w-full h-8 px-3 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                  Curriculum Code
                </label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g. CS-AIR"
                  className="w-full h-8 px-3 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B132B] mb-1">
                  Scope & Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Overview of curriculum modules covered..."
                  className="w-full p-2.5 text-xs bg-white border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1] text-[#0B132B]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#F1F5F9]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-[#475569] hover:bg-[#F1F5F9] rounded border border-[#E2E8F0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#4338CA] hover:bg-[#4F46E5] rounded transition-colors shadow-sm"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
