import React from 'react'; // Import React
import { render, fireEvent } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import EventForm from './EventForm'; // Import EventForm component
import { FormProviderProps } from 'react-hook-form';
import '@testing-library/jest-dom/extend-expect'; // Import the missing package

describe('EventForm', () => {
  let form: FormProviderProps;

  beforeEach(() => {
    form = {
      ...useForm(),
      children: null,
    };
  });

  describe('EventForm', () => {
    let form: FormProviderProps;

    beforeEach(() => {
      form = {
        ...useForm(),
        children: null,
      };
    });

    it('should render the form fields correctly', () => {
      const { getByPlaceholderText, getByText } = render(
        <FormProvider {...form}>
          <EventForm />
        </FormProvider>
      );

      expect(getByPlaceholderText('Event Location or Online')).toBeInTheDocument();
      expect(getByText('Start Date:')).toBeInTheDocument();
      expect(getByText('End Date:')).toBeInTheDocument();
    });
  });

  it('should update the form values when inputs change', () => {
    const { getByPlaceholderText } = render(
      <FormProvider {...form}>
        <EventForm />
      </FormProvider>
    );

    const locationInput = getByPlaceholderText('Event Location or Online');
    fireEvent.change(locationInput, { target: { value: 'Online' } });
    expect(locationInput.value).toBe('Online');
  });

  // Note: Testing the DatePicker component might be more complex and depends on the specific implementation of the DatePicker component.
});