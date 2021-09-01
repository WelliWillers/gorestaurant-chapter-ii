import { useCallback, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { FoodProps, newFoodProps } from '../../types';
import { FormHandles } from '@unform/core';

interface editingFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  editingFood: FoodProps;
  handleUpdateFood: (food: Omit<FoodProps, 'id' | 'available'>) => void;
}

export function ModalEditFood({isOpen, editingFood, setIsOpen, handleUpdateFood}: editingFoodProps) {

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: newFoodProps) => {
      const { name, image, price, description } = data;
      handleUpdateFood({ name, image, price, description });
      setIsOpen();
    },
    [handleUpdateFood, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};