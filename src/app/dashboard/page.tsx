'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { getQuestions } from '@/lib/survey';
import { Question } from '@/types/survey';
import { Download, Search, ArrowUpDown, Filter, Trash2, CheckCircle } from 'lucide-react';
import { CSV_HEADERS_ORDER, QUESTION_ID_TO_HEADER_MAP } from '@/lib/csvMapping';

interface ResponseData {
    _id: string;
    answers: Record<string, any>;
    createdAt: string;
}

export default function DashboardPage() {
    const [data, setData] = useState<ResponseData[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [isDeleting, setIsDeleting] = useState(false);

    const questions = useMemo(() => getQuestions(), []);

    // Map question IDs to text for headers
    const questionMap = useMemo(() => {
        return questions.reduce((acc, q) => {
            acc[q.id] = q.text;
            return acc;
        }, {} as Record<string, string>);
    }, [questions]);

    useEffect(() => {
        fetch('/api/responses')
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    setData(res.data);
                }
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const handleSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const toggleSelection = (id: string) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    const toggleAll = () => {
        if (selectedIds.size === filteredData.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(filteredData.map(item => item._id)));
        }
    };

    const handleDelete = async () => {
        if (selectedIds.size === 0) return;

        if (!window.confirm(`Are you sure you want to delete ${selectedIds.size} record(s)? This action cannot be undone.`)) {
            return;
        }

        setIsDeleting(true);
        try {
            const response = await fetch('/api/responses', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ids: Array.from(selectedIds) }),
            });

            const res = await response.json();

            if (res.success) {
                setData(prev => prev.filter(item => !selectedIds.has(item._id)));
                setSelectedIds(new Set());
            } else {
                alert('Failed to delete responses: ' + (res.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('An error occurred while deleting.');
        } finally {
            setIsDeleting(false);
        }
    };

    const filteredData = useMemo(() => {
        let sortedData = [...data];

        if (searchTerm) {
            sortedData = sortedData.filter((item) =>
                Object.values(item.answers).some((val) =>
                    String(val).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        if (sortConfig) {
            sortedData.sort((a, b) => {
                // Special handling for nested answers
                const valA = sortConfig.key === 'createdAt' ? a.createdAt : a.answers[sortConfig.key];
                const valB = sortConfig.key === 'createdAt' ? b.createdAt : b.answers[sortConfig.key];

                if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
                if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return sortedData;
    }, [data, searchTerm, sortConfig]);

    const exportCSV = () => {
        if (data.length === 0) return;

        // Import the mapping constants (Assuming they are available, otherwise I'll define them here or import them)
        // Since I cannot modify imports easily in this block without context, I will import at top level in another step or assume helper availability.
        // Waiting for import step. For now, I will rewrite the logic assuming imports are added.

        const headers = CSV_HEADERS_ORDER;
        const csvContent = [
            headers.join(','),
            ...data.map(row => { // Export ALL data, not just filtered, or arguably filtered. Let's stick to filteredData if user wants "Export" of what they see, but usually raw data export is all. User said "Export to csv option", matching "research.spss.csv". Usually that means full dataset. I will use filteredData to respect current view, or data for full. Let's use filteredData to match UI.

                const rowData = headers.map(header => {
                    // Find question ID for this header
                    const questionId = Object.keys(QUESTION_ID_TO_HEADER_MAP).find(key => QUESTION_ID_TO_HEADER_MAP[key] === header);

                    if (questionId) {
                        const val = row.answers[questionId];
                        return val !== undefined ? String(val) : '';
                    }
                    return ''; // Default empty if not found
                });

                return rowData.join(','); // No quotes based on sample file!
            })
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'export.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading dashboard...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Survey Responses</h1>
                        <p className="text-gray-500 mt-1">Manage and analyze questionnaire data</p>
                    </div>
                    <div className="flex gap-3">
                        {selectedIds.size > 0 && (
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm disabled:opacity-50"
                            >
                                <Trash2 size={18} /> {isDeleting ? 'Deleting...' : `Delete (${selectedIds.size})`}
                            </button>
                        )}
                        <button
                            onClick={exportCSV}
                            className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm"
                        >
                            <Download size={18} /> Export CSV
                        </button>
                    </div>
                </header>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Toolbar */}
                    <div className="p-5 border-b border-gray-100 flex gap-4 items-center justify-between">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search responses..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="text-sm text-gray-500">
                            {filteredData.length} records found
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-600">
                            <thead className="bg-gray-50 text-xs font-semibold text-gray-900 uppercase tracking-wider border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 w-10">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                                            checked={selectedIds.size > 0 && selectedIds.size === filteredData.length}
                                            onChange={toggleAll}
                                        />
                                    </th>
                                    <th
                                        className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => handleSort('createdAt')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Date <ArrowUpDown size={14} className="text-gray-400" />
                                        </div>
                                    </th>
                                    {questions.map((q) => (
                                        <th
                                            key={q.id}
                                            className="px-6 py-4 min-w-[200px] cursor-pointer hover:bg-gray-100 transition-colors"
                                            onClick={() => handleSort(q.id)}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="truncate max-w-[180px]" title={q.text}>{q.text}</span>
                                                {sortConfig?.key === q.id && <ArrowUpDown size={14} className={sortConfig.direction === 'asc' ? 'text-blue-600' : 'text-blue-600 rotate-180'} />}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredData.map((row) => (
                                    <tr key={row._id} className={selectedIds.has(row._id) ? "bg-blue-50/50 hover:bg-blue-50 transition-colors" : "hover:bg-gray-50/50 transition-colors"}>
                                        <td className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                                                checked={selectedIds.has(row._id)}
                                                onChange={() => toggleSelection(row._id)}
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                                            {new Date(row.createdAt).toLocaleDateString()} <span className="text-gray-400 text-xs ml-1">{new Date(row.createdAt).toLocaleTimeString()}</span>
                                        </td>
                                        {questions.map((q) => (
                                            <td key={q.id} className="px-6 py-4">
                                                {row.answers[q.id] !== undefined ? row.answers[q.id] : <span className="text-gray-300">-</span>}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                {filteredData.length === 0 && (
                                    <tr>
                                        <td colSpan={questions.length + 2} className="px-6 py-12 text-center text-gray-400">
                                            No responses found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
