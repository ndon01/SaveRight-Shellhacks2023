from django.db import models


class Budget(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=255)
    amount = models.IntegerField(default=0)
    color = models.CharField(max_length=7, default='#ffffff')
    username = models.CharField(max_length=255, null = False, blank = False,default = '')

    def __str__(self):
        return f"{self.name} - {self.amount}"
    
class Income(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=255)
    amount = models.IntegerField()
    date = models.DateField()
    username = models.CharField(max_length=255, null = False, blank = False,default = '')
    def __str__(self):
        return f"{self.name} - {self.amount}"
    
class Expense(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, null=True, blank=True)
    budget = models.ForeignKey(Budget, on_delete=models.CASCADE, null=True, blank=True) 
    name = models.CharField(max_length=255)
    amount = models.IntegerField()
    date = models.DateField()
    username = models.CharField(max_length=255, null = False, blank = False,default = '')

    def __str__(self):
        return f"{self.name} - {self.amount}"