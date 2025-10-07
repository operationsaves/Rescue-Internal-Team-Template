import React, { useState, useEffect } from 'react';
import { fetchResources } from '../services/mockApiService';
import type { ResourceLink } from '../types';

const ResourceCard: React.FC<{ resource: ResourceLink }> = ({ resource }) => (
    <a 
        href={resource.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block bg-white/60 backdrop-blur-md rounded-xl shadow-md p-6 mb-4 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
    >
        <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
                <div className="bg-blue-500 rounded-lg w-12 h-12 flex items-center justify-center">
                    <span className="text-2xl" role="img" aria-label="Link icon">🔗</span>
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-lg font-bold text-gray-900 truncate">{resource.title}</p>
                <p className="text-sm text-gray-600">{resource.description}</p>
            </div>
        </div>
    </a>
);


const ResourcesPage: React.FC = () => {
    const [resources, setResources] = useState<ResourceLink[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const data = await fetchResources();
            setResources(data);
            setLoading(false);
        };
        loadData();
    }, []);

    if (loading) {
        return <div className="text-center p-10">Loading resources...</div>;
    }

    return (
        <div>
            <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm p-4 mb-6">
                 <h2 className="text-xl font-bold text-gray-700">Quick Links</h2>
            </div>
            {resources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
            ))}
        </div>
    );
};

export default ResourcesPage;