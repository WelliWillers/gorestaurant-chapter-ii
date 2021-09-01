import { useCallback, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';

import { Modal } from '../Modal';
import { Input } from '../Input';
import { FoodProps, newFoodProps } from '../../types';
import { FormHandles } from '@unform/core';

interface addFoodModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: Omit<FoodProps, 'id' | 'available'>) => void;
}

export function ModalAddFood({
  isOpen,
  setIsOpen,
  handleAddFood,
}: addFoodModalProps) {

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: newFoodProps) => {
      const { name, image, price, description } = data;
      handleAddFood({ name, image, price, description });
      setIsOpen();
    },
    [handleAddFood, setIsOpen],
  );

    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Novo Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" />

          <Input name="name" placeholder="Ex: Moda Italiana" />
          <Input name="price" placeholder="Ex: 19.90" />

          <Input name="description" placeholder="Descrição" />
          <button type="submit" data-testid="add-food-button">
            <p className="text">Adicionar Prato</p>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
};