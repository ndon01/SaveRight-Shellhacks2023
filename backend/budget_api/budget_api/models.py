from django.db import models

class Budget(models.Model):
    name = models.CharField(max_length=255)
    amount = models.IntegerField(default=0)
    color = models.CharField(max_length=7, default='#ffffff')

    def __str__(self):
        return f"{self.name} - {self.budget}"
    
class Income(models.Model):
    name = models.CharField(max_length=255)
    amount = models.IntegerField()
    date = models.DateField()

    def __str__(self):
        return f"{self.name} - {self.amount}"
    
class Expense(models.Model):
    budget = models.ForeignKey(Budget, on_delete=models.CASCADE, null=True, blank=True) 
    name = models.CharField(max_length=255)
    amount = models.IntegerField()
    date = models.DateField()

    def __str__(self):
        return f"{self.name} - {self.amount}"