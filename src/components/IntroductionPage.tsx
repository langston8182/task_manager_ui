import React from 'react';
import { MessageSquare, CheckCircle, List, Trash2, Plus } from 'lucide-react';
import { redirectToAuth } from '../services/auth';

export const IntroductionPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-green-600 mb-8 flex items-center gap-3">
          <MessageSquare className="w-10 h-10" />
          Assistant de Tâches
        </h1>

        <div className="space-y-8">
          <section className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-gray-600 mb-6">
              Cette application vous permet de gérer vos tâches quotidiennes comme un chatbot.
              Posez simplement vos questions ou donnez vos instructions en langage naturel !
            </p>

            <div className="grid gap-4">
              <CommandExample
                icon={<List className="w-5 h-5" />}
                command="Quelles sont mes tâches ?"
                description="Pour voir toutes vos tâches"
              />
              <CommandExample
                icon={<Plus className="w-5 h-5" />}
                command="Demain je dois aller chez le médecin"
                description="Pour ajouter une nouvelle tâche"
              />
              <CommandExample
                icon={<Trash2 className="w-5 h-5" />}
                command="Supprime la tâche médecin"
                description="Pour supprimer une tâche"
              />
            </div>
          </section>

          <div className="flex justify-center">
            <button
              onClick={redirectToAuth}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              S'authentifier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommandExample: React.FC<{
  icon: React.ReactNode;
  command: string;
  description: string;
}> = ({ icon, command, description }) => (
  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
    <div className="text-green-600">{icon}</div>
    <div>
      <p className="font-medium text-gray-800">{command}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);