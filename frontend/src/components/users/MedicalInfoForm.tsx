import React, { useState } from 'react';

interface MedicalInfoFormProps {
  readOnly?: boolean;
  initialData?: any;
  onSubmit?: (data: any) => void;
}

const MedicalInfoForm: React.FC<MedicalInfoFormProps> = ({
  readOnly = false,
  initialData = {},
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    medicalTreatment: {
      dental: initialData.medicalTreatment?.dental || false,
      physiotherapy: initialData.medicalTreatment?.physiotherapy || false,
      phytotherapy: initialData.medicalTreatment?.phytotherapy || false,
      speechTherapy: initialData.medicalTreatment?.speechTherapy || false,
      medication: initialData.medicalTreatment?.medication || false,
      psychological: initialData.medicalTreatment?.psychological || false,
      other: initialData.medicalTreatment?.other || false,
      otherDescription: initialData.medicalTreatment?.otherDescription || '',
    },
    frequentInfections: {
      tonsils: initialData.frequentInfections?.tonsils || false,
      skin: initialData.frequentInfections?.skin || false,
      nose: initialData.frequentInfections?.nose || false,
      mouth: initialData.frequentInfections?.mouth || false,
      ear: initialData.frequentInfections?.ear || false,
      teeth: initialData.frequentInfections?.teeth || false,
      lung: initialData.frequentInfections?.lung || false,
      hemorrhage: initialData.frequentInfections?.hemorrhage || false,
      other: initialData.frequentInfections?.other || false,
      otherDescription: initialData.frequentInfections?.otherDescription || '',
    },
    epilepsyOrSeizure: {
      hasCondition: initialData.epilepsyOrSeizure?.hasCondition || false,
      description: initialData.epilepsyOrSeizure?.description || '',
    },
    allergicProblem: {
      hasCondition: initialData.allergicProblem?.hasCondition || false,
      description: initialData.allergicProblem?.description || '',
    },
    heartProblem: {
      hasCondition: initialData.heartProblem?.hasCondition || false,
      description: initialData.heartProblem?.description || '',
    },
    bloodProblem: {
      hasCondition: initialData.bloodProblem?.hasCondition || false,
      description: initialData.bloodProblem?.description || '',
    },
    diabetesProblem: {
      hasCondition: initialData.diabetesProblem?.hasCondition || false,
      description: initialData.diabetesProblem?.description || '',
    },
    boneProblem: {
      hasCondition: initialData.boneProblem?.hasCondition || false,
      description: initialData.boneProblem?.description || '',
    },
  });

  const handleCheckboxChange = (section: string, field: string) => {
    if (readOnly) return;
    
    setFormData({
      ...formData,
      [section]: {
        ...formData[section as keyof typeof formData],
        [field]: !(formData[section as keyof typeof formData] as any)[field]
      }
    });
  };

  const handleTextChange = (section: string, field: string, value: string) => {
    if (readOnly) return;
    
    setFormData({
      ...formData,
      [section]: {
        ...formData[section as keyof typeof formData],
        [field]: value
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Informações Médicas</h3>
        
        {/* Tratamento Médico */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-2">Atualmente o aluno está fazendo tratamento médico ou de saúde?</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="dental"
                checked={formData.medicalTreatment.dental}
                onChange={() => handleCheckboxChange('medicalTreatment', 'dental')}
                disabled={readOnly}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="dental" className="ml-2 block text-sm text-gray-700">Odontológico</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="physiotherapy"
                checked={formData.medicalTreatment.physiotherapy}
                onChange={() => handleCheckboxChange('medicalTreatment', 'physiotherapy')}
                disabled={readOnly}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="physiotherapy" className="ml-2 block text-sm text-gray-700">Fisioterapeutico</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="phytotherapy"
                checked={formData.medicalTreatment.phytotherapy}
                onChange={() => handleCheckboxChange('medicalTreatment', 'phytotherapy')}
                disabled={readOnly}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="phytotherapy" className="ml-2 block text-sm text-gray-700">Fitoterápico</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="speechTherapy"
                checked={formData.medicalTreatment.speechTherapy}
                onChange={() => handleCheckboxChange('medicalTreatment', 'speechTherapy')}
                disabled={readOnly}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="speechTherapy" className="ml-2 block text-sm text-gray-700">Fonoaudiólogo</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="medication"
                checked={formData.medicalTreatment.medication}
                onChange={() => handleCheckboxChange('medicalTreatment', 'medication')}
                disabled={readOnly}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="medication" className="ml-2 block text-sm text-gray-700">Medicamentoso</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="psychological"
                checked={formData.medicalTreatment.psychological}
                onChange={() => handleCheckboxChange('medicalTreatment', 'psychological')}
                disabled={readOnly}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="psychological" className="ml-2 block text-sm text-gray-700">Psicológico</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="otherTreatment"
                checked={formData.medicalTreatment.other}
                onChange={() => handleCheckboxChange('medicalTreatment', 'other')}
                disabled={readOnly}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="otherTreatment" className="ml-2 block text-sm text-gray-700">Outros</label>
            </div>
          </div>
          {formData.medicalTreatment.other && (
            <div className="mt-3">
              <label htmlFor="otherTreatmentDesc" className="block text-sm font-medium text-gray-700">Quais?</label>
              <input
                type="text"
                id="otherTreatmentDesc"
                value={formData.medicalTreatment.otherDescription}
                onChange={(e) => handleTextChange('medicalTreatment', 'otherDescription', e.target.value)}
                disabled={readOnly}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          )}
        </div>

        {/* Infecções Frequentes */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-2">Tem frequentes infecções</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="tonsils"
                checked={formData.frequentInfections.tonsils}
                onChange={() => handleCheckboxChange('frequentInfections', 'tonsils')}
                disabled={readOnly}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="tonsils" className="ml-2 block text-sm text-gray-700">Amídalas</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="skin"
                checked={formData.frequentInfections.skin}
                onChange={() => handleCheckboxChange('frequentInfections', 'skin')}
                disabled={readOnly}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="skin" className="ml-2 block text-sm text-gray-700">Pele</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="nose"
                checked={formData.frequentInfections.nose}
                onChange={() => handleCheckboxChange('frequentInfections', 'nose')}
                disabled={readOnly}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="nose" className="ml-2 block text-sm text-gray-700">Nariz</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="mouth"
                checked={formData.frequentInfections.mouth}
                onChange={() => handleCheckboxChange('frequentInfections', 'mouth')}
                disabled={readOnly}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="mouth" className="ml-2 block text-sm text-gray-700">Boca</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="ear"
                checked={formData.frequentInfections.ear}
                onChange={() => handleCheckboxChange('frequentInfections', 'ear')}
                disabled={readOnly}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="ear" className="ml-2 block text-sm text-gray-700">Ouvido</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="teeth"
                checked={formData.frequentInfections.teeth}
                onChange={() => handleCheckboxChange('frequentInfections', 'teeth')}
                disabled={readOnly}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="teeth" className="ml-2 block text-sm text-gray-700">Dentes</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="lung"
                checked={formData.frequentInfections.lung}
                onChange={() => handleCheckboxChange('frequentInfections', 'lung')}
                disabled={readOnly}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="lung" className="ml-2 block text-sm text-gray-700">Pulmão</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hemorrhage"
                checked={formData.frequentInfections.hemorrhage}
                onChange={() => handleCheckboxChange('frequentInfections', 'hemorrhage')}
                disabled={readOnly}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="hemorrhage" className="ml-2 block text-sm text-gray-700">Hemorragia</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="otherInfection"
                checked={formData.frequentInfections.other}
                onChange={() => handleCheckboxChange('frequentInfections', 'other')}
                disabled={readOnly}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="otherInfection" className="ml-2 block text-sm text-gray-700">Outros</label>
            </div>
          </div>
          {formData.frequentInfections.other && (
            <div className="mt-3">
              <label htmlFor="otherInfectionDesc" className="block text-sm font-medium text-gray-700">Quais?</label>
              <input
                type="text"
                id="otherInfectionDesc"
                value={formData.frequentInfections.otherDescription}
                onChange={(e) => handleTextChange('frequentInfections', 'otherDescription', e.target.value)}
                disabled={readOnly}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          )}
        </div>

        {/* Epilepsia ou Convulsão */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-2">Apresentou algum problema de eplepsia ou convulção?</h4>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="epilepsyNo"
                name="epilepsy"
                checked={!formData.epilepsyOrSeizure.hasCondition}
                onChange={() => handleTextChange('epilepsyOrSeizure', 'hasCondition', 'false')}
                disabled={readOnly}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="epilepsyNo" className="ml-2 block text-sm text-gray-700">Não</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="epilepsyYes"
                name="epilepsy"
                checked={formData.epilepsyOrSeizure.hasCondition}
                onChange={() => handleTextChange('epilepsyOrSeizure', 'hasCondition', 'true')}
                disabled={readOnly}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="epilepsyYes" className="ml-2 block text-sm text-gray-700">Sim</label>
            </div>
          </div>
          {formData.epilepsyOrSeizure.hasCondition && (
            <div className="mt-3">
              <label htmlFor="epilepsyDesc" className="block text-sm font-medium text-gray-700">Se sim, especifique</label>
              <input
                type="text"
                id="epilepsyDesc"
                value={formData.epilepsyOrSeizure.description}
                onChange={(e) => handleTextChange('epilepsyOrSeizure', 'description', e.target.value)}
                disabled={readOnly}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          )}
        </div>

        {/* Problema Alérgico */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-2">Apresentou algum problema alérgico</h4>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="allergyNo"
                name="allergy"
                checked={!formData.allergicProblem.hasCondition}
                onChange={() => handleTextChange('allergicProblem', 'hasCondition', 'false')}
                disabled={readOnly}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="allergyNo" className="ml-2 block text-sm text-gray-700">Não</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="allergyYes"
                name="allergy"
                checked={formData.allergicProblem.hasCondition}
                onChange={() => handleTextChange('allergicProblem', 'hasCondition', 'true')}
                disabled={readOnly}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="allergyYes" className="ml-2 block text-sm text-gray-700">Sim</label>
            </div>
          </div>
          {formData.allergicProblem.hasCondition && (
            <div className="mt-3">
              <label htmlFor="allergyDesc" className="block text-sm font-medium text-gray-700">Se sim, especifique</label>
              <input
                type="text"
                id="allergyDesc"
                value={formData.allergicProblem.description}
                onChange={(e) => handleTextChange('allergicProblem', 'description', e.target.value)}
                disabled={readOnly}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          )}
        </div>

        {/* Problema Cardíaco */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-2">Apresentou algum problema cardíaco?</h4>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="heartNo"
                name="heart"
                checked={!formData.heartProblem.hasCondition}
                onChange={() => handleTextChange('heartProblem', 'hasCondition', 'false')}
                disabled={readOnly}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="heartNo" className="ml-2 block text-sm text-gray-700">Não</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="heartYes"
                name="heart"
                checked={formData.heartProblem.hasCondition}
                onChange={() => handleTextChange('heartProblem', 'hasCondition', 'true')}
                disabled={readOnly}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="heartYes" className="ml-2 block text-sm text-gray-700">Sim</label>
            </div>
          </div>
          {formData.heartProblem.hasCondition && (
            <div className="mt-3">
              <label htmlFor="heartDesc" className="block text-sm font-medium text-gray-700">Se sim, especifique</label>
              <input
                type="text"
                id="heartDesc"
                value={formData.heartProblem.description}
                onChange={(e) => handleTextChange('heartProblem', 'description', e.target.value)}
                disabled={readOnly}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          )}
        </div>

        {/* Problema de Sangue */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-2">Apresentou algum problema sangue?</h4>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="bloodNo"
                name="blood"
                checked={!formData.bloodProblem.hasCondition}
                onChange={() => handleTextChange('bloodProblem', 'hasCondition', 'false')}
                disabled={readOnly}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="bloodNo" className="ml-2 block text-sm text-gray-700">Não</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="bloodYes"
                name="blood"
                checked={formData.bloodProblem.hasCondition}
                onChange={() => handleTextChange('bloodProblem', 'hasCondition', 'true')}
                disabled={readOnly}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="bloodYes" className="ml-2 block text-sm text-gray-700">Sim</label>
            </div>
          </div>
          {formData.bloodProblem.hasCondition && (
            <div className="mt-3">
              <label htmlFor="bloodDesc" className="block text-sm font-medium text-gray-700">Se sim, especifique</label>
              <input
                type="text"
                id="bloodDesc"
                value={formData.bloodProblem.description}
                onChange={(e) => handleTextChange('bloodProblem', 'description', e.target.value)}
                disabled={readOnly}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          )}
        </div>

        {/* Problema de Diabetes */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-2">Apresentou algum quadro de Diabete?</h4>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="diabetesNo"
                name="diabetes"
                checked={!formData.diabetesProblem.hasCondition}
                onChange={() => handleTextChange('diabetesProblem', 'hasCondition', 'false')}
                disabled={readOnly}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="diabetesNo" className="ml-2 block text-sm text-gray-700">Não</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="diabetesYes"
                name="diabetes"
                checked={formData.diabetesProblem.hasCondition}
                onChange={() => handleTextChange('diabetesProblem', 'hasCondition', 'true')}
                disabled={readOnly}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="diabetesYes" className="ml-2 block text-sm text-gray-700">Sim</label>
            </div>
          </div>
          {formData.diabetesProblem.hasCondition && (
            <div className="mt-3">
              <label htmlFor="diabetesDesc" className="block text-sm font-medium text-gray-700">Se sim, especifique</label>
              <input
                type="text"
                id="diabetesDesc"
                value={formData.diabetesProblem.description}
                onChange={(e) => handleTextChange('diabetesProblem', 'description', e.target.value)}
                disabled={readOnly}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          )}
        </div>

        {/* Problema Ósseo */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-2">Apresentou algum quadro de ósseo?</h4>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="boneNo"
                name="bone"
                checked={!formData.boneProblem.hasCondition}
                onChange={() => handleTextChange('boneProblem', 'hasCondition', 'false')}
                disabled={readOnly}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="boneNo" className="ml-2 block text-sm text-gray-700">Não</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="boneYes"
                name="bone"
                checked={formData.boneProblem.hasCondition}
                onChange={() => handleTextChange('boneProblem', 'hasCondition', 'true')}
                disabled={readOnly}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="boneYes" className="ml-2 block text-sm text-gray-700">Sim</label>
            </div>
          </div>
          {formData.boneProblem.hasCondition && (
            <div className="mt-3">
              <label htmlFor="boneDesc" className="block text-sm font-medium text-gray-700">Se sim, especifique</label>
              <input
                type="text"
                id="boneDesc"
                value={formData.boneProblem.description}
                onChange={(e) => handleTextChange('boneProblem', 'description', e.target.value)}
                disabled={readOnly}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          )}
        </div>

        {!readOnly && (
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Salvar
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default MedicalInfoForm;