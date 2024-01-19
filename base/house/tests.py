# ----- 3rd Party Libraries -----
from django.test import TestCase
from django.urls import reverse

# ----- In-Built Libraries -----
from .models import Process_Statement

# ----- Tests -----
class PersonCRUDTests(TestCase):
    def test_create_receipt(self):
        new_receipt_data = {
            'date': '2023-10-10 13:11:18',
            'phonenumber': '07897***678',
            'name': 'Charles',
            'giving':'tithe',
            'amount':'50.00',
            'status':'UNSENT'
        }
        response = self.client.post(reverse('create_person'), data=new_receipt_data)
        self.assertEqual(response.status_code, 302)  # Assuming successful creation redirects

        # Check if the new person is in the database
        new_receipt = Process_Statement.objects.get(name='Charles')
        self.assertEqual(new_receipt.phonenumber, '07897***678')

    def test_read_person(self):
        response = self.client.get(reverse('read_person', args=[self.person.id]))
        self.assertEqual(response.status_code, 200)  # Assuming successful read

        # Check if the retrieved person's details are correct
        self.assertContains(response, 'John Doe')
        self.assertContains(response, 'john@example.com')

    def test_update_person(self):
        updated_data = {
            'name': 'John Updated',
            'email': 'john.updated@example.com',
            'phonenumber': '1112223333',
            'occupation': 'Updated Occupation'
        }
        response = self.client.post(reverse('update_person', args=[self.person.id]), data=updated_data)
        self.assertEqual(response.status_code, 302)  # Assuming successful update redirects

        # Check if the person's details have been updated in the database
        self.person.refresh_from_db()
        self.assertEqual(self.person.name, 'John Updated')
        self.assertEqual(self.person.phonenumber, '1112223333')

    def test_delete_person(self):
        response = self.client.post(reverse('delete_person', args=[self.person.id]))
        self.assertEqual(response.status_code, 302)  # Assuming successful delete redirects

        # Check if the person has been deleted from the database
        with self.assertRaises(Person.DoesNotExist):
            Person.objects.get(name='John Doe')
