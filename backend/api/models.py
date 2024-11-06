# api/models.py
from django.db import models


class Expense(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    date = models.DateField()

    def __str__(self):
        return f"{self.amount} - {self.category}"
    

class Income(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=255, default='Uncategorized')  # Provide a default value
    description = models.TextField(blank=True, null=True)
    date = models.DateField()
    
    def __str__(self):
        return f"{self.amount} - {self.category}"
    
class Budget(models.Model):
    category = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    month  = models.DateField()
    # month = models.CharField(max_length=50)
    # month = models.CharField(max_length=7)  # Format 'YYYY-MM'

    def __str__(self):
        return f"{self.category}: {self.amount} for {self.month}"
