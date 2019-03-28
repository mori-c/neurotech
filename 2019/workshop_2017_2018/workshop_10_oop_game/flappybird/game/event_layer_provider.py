"""
Abstracts away input providing from the main Pygame
event queue.

Please do not modify any code in this file.
EMG/Input should be provided in input.py
"""

import pygame
from pygame.constants import USEREVENT


from input import _trigger_input

INPUT_EVENT = USEREVENT + 1

def __post_input_events():
    """
    Creates the pygame event.
    """
    # creating the event
    input_event = pygame.event.Event(INPUT_EVENT)
    if _trigger_input():
        pygame.event.post(input_event)

